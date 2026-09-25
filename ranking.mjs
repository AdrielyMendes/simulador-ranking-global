import { list, put } from '@vercel/blob';

const BLOB_PATH = 'ranking/global.json';
const MAX_RESULTS = 100;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

function normalizarNome(nome) {
  return String(nome ?? '').trim().replace(/\s+/g, ' ').slice(0, 30);
}

function normalizarPontuacao(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(1000, Math.round(n)));
}

async function lerRanking() {
  const resultado = await list({ prefix: BLOB_PATH, limit: 10 });
  const blob = resultado.blobs.find((item) => item.pathname === BLOB_PATH);

  if (!blob) return [];

  try {
    const resposta = await fetch(blob.url, { cache: 'no-store' });
    if (!resposta.ok) return [];
    const dados = await resposta.json();
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

async function salvarRanking(ranking) {
  await put(BLOB_PATH, JSON.stringify(ranking), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true
  });
}

export default async function handler(request) {
  try {
    if (request.method === 'GET') {
      const ranking = await lerRanking();
      return json({ ranking });
    }

    if (request.method === 'POST') {
      const body = await request.json();
      const nome = normalizarNome(body.nome);
      const pontuacao = normalizarPontuacao(body.pontuacao);

      if (!nome) return json({ erro: 'Nome do gestor é obrigatório.' }, 400);
      if (pontuacao === null) return json({ erro: 'Pontuação inválida.' }, 400);

      const ranking = await lerRanking();
      const novoRegistro = {
        id: crypto.randomUUID(),
        nome,
        pontuacao,
        data: new Date().toISOString()
      };

      ranking.push(novoRegistro);
      ranking.sort((a, b) => b.pontuacao - a.pontuacao || a.data.localeCompare(b.data));
      const limitado = ranking.slice(0, MAX_RESULTS);

      await salvarRanking(limitado);

      return json({ sucesso: true, resultado: novoRegistro, ranking: limitado });
    }

    if (request.method === 'DELETE') {
      // Proteção simples: limpeza não é exposta pelo navegador.
      return json({ erro: 'Operação não permitida.' }, 405);
    }

    return json({ erro: 'Método não permitido.' }, 405);
  } catch (erro) {
    console.error(erro);
    return json({ erro: 'Não foi possível acessar o ranking agora.' }, 500);
  }
}
