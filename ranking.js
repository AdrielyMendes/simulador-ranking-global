import { list, put } from '@vercel/blob';

const BLOB_PATH = 'ranking/global.json';
const MAX_RESULTS = 100;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.end(JSON.stringify(data));
}

function nomeValido(nome) {
  return String(nome ?? '').trim().replace(/\s+/g, ' ').slice(0, 30);
}

function pontuacaoValida(valor) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(1000, Math.round(n)));
}

async function lerRanking() {
  const resultado = await list({ prefix: BLOB_PATH, limit: 10 });
  const blob = resultado.blobs.find((item) => item.pathname === BLOB_PATH);
  if (!blob) return [];

  // O ranking é um arquivo JSON público no Blob. Como a leitura acontece
  // no servidor, o navegador nunca precisa acessar o Blob diretamente.
  const resposta = await fetch(blob.url, { cache: 'no-store' });
  if (!resposta.ok) {
    throw new Error(`Falha ao ler o Blob (${resposta.status}).`);
  }

  const texto = await resposta.text();
  if (!texto.trim()) return [];

  const dados = JSON.parse(texto);
  return Array.isArray(dados) ? dados : [];
}

async function salvarRanking(ranking) {
  await put(BLOB_PATH, JSON.stringify(ranking), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const ranking = await lerRanking();
      return sendJson(res, 200, { ranking });
    }

    if (req.method === 'POST') {
      let body;
      try {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      } catch {
        return sendJson(res, 400, { erro: 'JSON inválido.' });
      }

      const nome = nomeValido(body.nome);
      const pontuacao = pontuacaoValida(body.pontuacao);

      if (!nome) return sendJson(res, 400, { erro: 'Nome do gestor é obrigatório.' });
      if (pontuacao === null) return sendJson(res, 400, { erro: 'Pontuação inválida.' });

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

      return sendJson(res, 200, {
        sucesso: true,
        resultado: novoRegistro,
        ranking: limitado
      });
    }

    return sendJson(res, 405, { erro: 'Método não permitido.' });
  } catch (erro) {
    console.error('RANKING_ERROR:', erro);
    return sendJson(res, 500, {
      erro: 'Não foi possível acessar o ranking global.',
      detalhe: process.env.NODE_ENV === 'development' ? String(erro?.message || erro) : undefined
    });
  }
}
