# Simulador de Decisões Gerenciais — Ranking Global

Projeto HTML/CSS/JavaScript preparado para publicação na Vercel com ranking global.

## Como publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. Não é necessário informar comando de build. A Vercel reconhecerá o projeto.
4. Depois que o projeto for importado, abra **Storage** no projeto da Vercel.
5. Crie uma **Vercel Blob Store** com acesso **Public** e conecte-a ao projeto.
6. A Vercel criará a variável `BLOB_READ_WRITE_TOKEN` automaticamente.
7. Faça um novo deploy/redeploy.

## Como funciona

- `index.html`, `style.css` e `script.js` formam o jogo.
- `api/ranking.mjs` é a função serverless que consulta e salva o ranking.
- O ranking fica armazenado em um arquivo JSON dentro da Vercel Blob.
- Todos os visitantes do mesmo site consultam o mesmo ranking.

## Importante

A pontuação enviada ao servidor é limitada entre 0 e 1000 e o nome entre 1 e 30 caracteres. O endpoint aceita leitura (`GET`) e envio de pontuação (`POST`).

Para testar localmente a API, é necessário executar o projeto pela Vercel CLI e ter a variável da Blob configurada; abrir o `index.html` diretamente pelo computador não fornece a função `/api/ranking`.
