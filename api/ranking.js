import { get, put } from "@vercel/blob";

const BLOB_PATH = "ranking/global.json";
const MAX_RESULTS = 100;

function enviarJSON(res, status, dados) {
  res.status(status);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  return res.end(JSON.stringify(dados));
}

function validarNome(nome) {
  return String(nome ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 30);
}

function validarPontuacao(valor) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return null;
  }

  return Math.max(0, Math.min(1000, Math.round(numero)));
}

async function lerRanking() {
  try {
    const resultado = await get(BLOB_PATH, {
      access: "public",
      useCache: false
    });

    if (!resultado) {
      return [];
    }

    const texto = await new Response(resultado.stream).text();

    if (!texto.trim()) {
      return [];
    }

    const ranking = JSON.parse(texto);

    return Array.isArray(ranking) ? ranking : [];
  } catch (erro) {
    console.error("ERRO AO LER RANKING:", erro);

    return [];
  }
}

async function salvarRanking(ranking) {
  await put(
    BLOB_PATH,
    JSON.stringify(ranking),
    {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true
    }
  );
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const ranking = await lerRanking();

      return enviarJSON(res, 200, {
        ranking
      });
    }

    if (req.method === "POST") {
      let body;

      try {
        body =
          typeof req.body === "string"
            ? JSON.parse(req.body)
            : req.body || {};
      } catch {
        return enviarJSON(res, 400, {
          erro: "JSON inválido."
        });
      }

      const nome = validarNome(body.nome);
      const pontuacao = validarPontuacao(body.pontuacao);

      if (!nome) {
        return enviarJSON(res, 400, {
          erro: "Nome do gestor é obrigatório."
        });
      }

      if (pontuacao === null) {
        return enviarJSON(res, 400, {
          erro: "Pontuação inválida."
        });
      }

      const ranking = await lerRanking();

      const novoRegistro = {
        id: crypto.randomUUID(),
        nome,
        pontuacao,
        data: new Date().toISOString()
      };

      ranking.push(novoRegistro);

      ranking.sort(
        (a, b) =>
          b.pontuacao - a.pontuacao ||
          a.data.localeCompare(b.data)
      );

      const rankingFinal = ranking.slice(0, MAX_RESULTS);

      await salvarRanking(rankingFinal);

      return enviarJSON(res, 200, {
        sucesso: true,
        resultado: novoRegistro,
        ranking: rankingFinal
      });
    }

    return enviarJSON(res, 405, {
      erro: "Método não permitido."
    });

  } catch (erro) {
    console.error("RANKING_ERROR:", erro);

    return enviarJSON(res, 500, {
      erro: "Não foi possível acessar o ranking global.",
      detalhe: String(erro?.message || erro)
    });
  }
}