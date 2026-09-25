// ========================================
// ESTADO INICIAL DA EMPRESA
// ========================================

let empresa = {

    funcionarios: 20,
    caixa: 50000,
    producao: 1000,
    estoque: 1000,
    vendas: 1000,
    satisfacao: 75,
    logistica: 80,
    rh: 80

};


// ========================================
// PROBLEMAS DO JOGO
// ========================================

let problemas = [

    {
        titulo: "Funcionários sobrecarregados",

        descricao:
            "Os funcionários estão sobrecarregados e a produção está sendo prejudicada. Como gestor, você precisa tomar uma decisão.",

        decisoes: [
            "👥 Contratar funcionários",
            "⏰ Fazer horas extras",
            "🔄 Redistribuir tarefas",
            "❌ Não fazer nada"
        ]
    },

    {
        titulo: "Falta de estoque",

        descricao:
            "A empresa está com pouco estoque de matéria-prima e isso pode afetar a produção.",

        decisoes: [
            "📦 Comprar matéria-prima",
            "🤝 Trocar fornecedor",
            "📉 Reduzir produção",
            "❌ Não fazer nada"
        ]
    },

    {
        titulo: "Queda nas vendas",

        descricao:
            "As vendas da empresa diminuíram e isso está afetando os resultados financeiros.",

        decisoes: [
            "📢 Investir em publicidade",
            "🏷️ Fazer promoção",
            "💡 Criar novo produto",
            "📉 Reduzir produção"
        ]
    },

    {
        titulo: "Atrasos nas entregas",

        descricao:
            "Os clientes estão recebendo os pedidos com atraso.",

        decisoes: [
            "🚚 Contratar transportadora",
            "🚛 Aumentar frota",
            "🗺️ Reorganizar rotas",
            "❌ Não fazer nada"
        ]
    },

    {
        titulo: "Custos elevados",

        descricao:
            "Os custos da empresa aumentaram e estão reduzindo o resultado financeiro.",

        decisoes: [
            "🤝 Trocar fornecedor",
            "👥 Reduzir funcionários",
            "🤖 Automatizar processos",
            "📉 Reduzir produção"
        ]
    },

    {
        titulo: "Reclamações dos clientes",

        descricao:
            "O número de reclamações dos clientes aumentou.",

        decisoes: [
            "🎓 Treinar funcionários",
            "👨‍💼 Contratar atendentes",
            "🔧 Melhorar produto",
            "❌ Não fazer nada"
        ]
    },

    {
        titulo: "Falha no sistema",

        descricao:
            "O sistema utilizado pela empresa está apresentando falhas.",

        decisoes: [
            "💻 Comprar novo sistema",
            "🔧 Fazer manutenção",
            "🧑‍💻 Contratar suporte externo",
            "❌ Não fazer nada"
        ]
    },

    {
        titulo: "Aumento da concorrência",

        descricao:
            "Novos concorrentes entraram no mercado e estão disputando os mesmos clientes.",

        decisoes: [
            "💰 Reduzir preços",
            "📢 Investir em marketing",
            "⭐ Melhorar produto",
            "❌ Não alterar estratégia"
        ]
    },

    {
        titulo: "Fornecedor aumentou os preços",

        descricao:
            "Um fornecedor aumentou o preço da matéria-prima utilizada pela empresa.",

        decisoes: [
            "🔎 Procurar outro fornecedor",
            "🤝 Negociar com fornecedor",
            "💰 Repassar aumento ao cliente",
            "💸 Absorver o aumento"
        ]
    },

    {
        titulo: "Aumento repentino da demanda",

        descricao:
            "A procura pelos produtos aumentou rapidamente e a empresa precisa reagir.",

        decisoes: [
            "🏭 Aumentar produção",
            "👥 Contratar funcionários",
            "🤝 Terceirizar produção",
            "📦 Limitar pedidos"
        ]
    }

];


// ========================================
// CONTROLE DO JOGO
// ========================================

let problemaAtual = 0;
let nomeGestor = "";
let decisaoTomada = false;
let jogoFinalizado = false;


// ========================================
// INICIAR JOGO
// ========================================

function iniciarJogo() {

    const campoNome = document.getElementById("nomeGestor");
    nomeGestor = campoNome.value.trim().replace(/\s+/g, " ");

    if (!nomeGestor) {
        alert("Digite o nome do gestor para entrar no ranking global.");
        campoNome.focus();
        return;
    }

    if (nomeGestor.length > 30) {
        nomeGestor = nomeGestor.slice(0, 30);
    }

    problemaAtual = 0;
    jogoFinalizado = false;
    decisaoTomada = false;

    document.getElementById("inicio").classList.add("escondido");

    document.getElementById("jogo").classList.remove("escondido");

    mostrarProblema();

    atualizarIndicadores();
}


// ========================================
// MOSTRAR PROBLEMA
// ========================================

function mostrarProblema() {

    let problema = problemas[problemaAtual];

    document.getElementById("problemaAtual").innerHTML = `

        <div class="problema-titulo">
            ⚠️ ${problema.titulo}
        </div>

        <p class="problema-descricao">
            ${problema.descricao}
        </p>

    `;


    let botoes = "";

    for (let i = 0; i < problema.decisoes.length; i++) {

        botoes += `

            <button 
                class="btn-decisao"
                onclick="tomarDecisao(${i})">

                ${problema.decisoes[i]}

            </button>

        `;
    }


    document.getElementById("decisoes").innerHTML = botoes;


    // Limpa o resultado anterior

    document.getElementById("resultadoTempoReal").innerHTML = "";
    decisaoTomada = false;
    const btn = document.getElementById("btnProximo");
    if (btn) btn.disabled = true;

}


// ========================================
// ATUALIZAR INDICADORES
// ========================================

function atualizarIndicadores() {

    document.getElementById("indicadores").innerHTML = `

        <div class="indicador">
            <strong>👥 Funcionários</strong>
            <span>${empresa.funcionarios}</span>
        </div>

        <div class="indicador">
            <strong>💰 Caixa</strong>
            <span>R$ ${empresa.caixa.toLocaleString("pt-BR")}</span>
        </div>

        <div class="indicador">
            <strong>🏭 Produção</strong>
            <span>${empresa.producao}</span>
        </div>

        <div class="indicador">
            <strong>📦 Estoque</strong>
            <span>${empresa.estoque}</span>
        </div>

        <div class="indicador">
            <strong>🛒 Vendas</strong>
            <span>${empresa.vendas}</span>
        </div>

        <div class="indicador">
            <strong>😊 Satisfação</strong>
            <span>${empresa.satisfacao}%</span>
        </div>

    `;
}


// ========================================
// TOMAR DECISÃO
// ========================================

function tomarDecisao(indice) {

    if (decisaoTomada || jogoFinalizado) return;
    decisaoTomada = true;

    let problema = problemaAtual;

    let escolha = problemas[problema].decisoes[indice];


    // Guarda o estado ANTES da decisão

    let antes = {

        funcionarios: empresa.funcionarios,
        caixa: empresa.caixa,
        producao: empresa.producao,
        estoque: empresa.estoque,
        vendas: empresa.vendas,
        satisfacao: empresa.satisfacao,
        logistica: empresa.logistica,
        rh: empresa.rh

    };


    // ====================================
    // PROBLEMA 1
    // ====================================

    if (problema === 0) {

        if (indice === 0) {

            empresa.funcionarios += 3;
            empresa.caixa -= 6000;
            empresa.producao += 150;
            empresa.rh += 10;
            empresa.satisfacao += 8;

        }

        else if (indice === 1) {

            empresa.caixa -= 3000;
            empresa.producao += 100;
            empresa.rh -= 5;
            empresa.satisfacao += 5;

        }

        else if (indice === 2) {

            empresa.rh += 5;
            empresa.producao += 50;
            empresa.satisfacao += 3;

        }

        else {

            empresa.rh -= 10;
            empresa.producao -= 100;
            empresa.satisfacao -= 8;

        }

    }


    // ====================================
    // PROBLEMA 2
    // ====================================

    else if (problema === 1) {

        if (indice === 0) {

            empresa.estoque += 600;
            empresa.caixa -= 8000;
            empresa.producao += 100;
            empresa.satisfacao += 5;

        }

        else if (indice === 1) {

            empresa.estoque += 500;
            empresa.caixa -= 6000;
            empresa.logistica -= 5;
            empresa.producao += 80;

        }

        else if (indice === 2) {

            empresa.producao -= 200;
            empresa.estoque += 150;
            empresa.caixa += 2000;
            empresa.satisfacao -= 10;

        }

        else {

            empresa.estoque -= 150;
            empresa.producao -= 200;
            empresa.satisfacao -= 15;

        }

    }


    // ====================================
    // PROBLEMA 3
    // ====================================

    else if (problema === 2) {

        if (indice === 0) {

            empresa.caixa -= 5000;
            empresa.vendas += 150;
            empresa.satisfacao += 3;

        }

        else if (indice === 1) {

            empresa.caixa -= 2000;
            empresa.vendas += 200;
            empresa.satisfacao += 5;

        }

        else if (indice === 2) {

            empresa.caixa -= 8000;
            empresa.producao -= 50;
            empresa.vendas += 250;
            empresa.satisfacao += 10;

        }

        else {

            empresa.caixa += 3000;
            empresa.producao -= 200;
            empresa.vendas -= 100;
            empresa.satisfacao -= 8;

        }

    }


    // ====================================
    // PROBLEMA 4
    // ====================================

    else if (problema === 3) {

        if (indice === 0) {

            empresa.caixa -= 4000;
            empresa.logistica += 20;
            empresa.satisfacao += 10;

        }

        else if (indice === 1) {

            empresa.caixa -= 12000;
            empresa.logistica += 25;
            empresa.satisfacao += 12;

        }

        else if (indice === 2) {

            empresa.caixa -= 1000;
            empresa.logistica += 15;
            empresa.satisfacao += 7;

        }

        else {

            empresa.logistica -= 10;
            empresa.satisfacao -= 15;

        }

    }


    // ====================================
    // PROBLEMA 5
    // ====================================

    else if (problema === 4) {

        if (indice === 0) {

            empresa.caixa += 5000;
            empresa.estoque -= 50;

        }

        else if (indice === 1) {

            empresa.funcionarios -= 3;
            empresa.caixa += 6000;
            empresa.rh -= 15;
            empresa.producao -= 100;
            empresa.satisfacao -= 8;

        }

        else if (indice === 2) {

            empresa.caixa -= 10000;
            empresa.producao += 150;

        }

        else {

            empresa.caixa += 4000;
            empresa.producao -= 200;
            empresa.vendas -= 100;

        }

    }


    // ====================================
    // PROBLEMA 6
    // ====================================

    else if (problema === 5) {

        if (indice === 0) {

            empresa.caixa -= 2000;
            empresa.rh += 10;
            empresa.satisfacao += 10;

        }

        else if (indice === 1) {

            empresa.funcionarios += 2;
            empresa.caixa -= 4000;
            empresa.satisfacao += 12;

        }

        else if (indice === 2) {

            empresa.caixa -= 7000;
            empresa.satisfacao += 15;
            empresa.vendas += 100;

        }

        else {

            empresa.satisfacao -= 15;
            empresa.vendas -= 100;

        }

    }


    // ====================================
    // PROBLEMA 7
    // ====================================

    else if (problema === 6) {

        if (indice === 0) {

            empresa.caixa -= 12000;
            empresa.vendas += 50;
            empresa.satisfacao += 5;

        }

        else if (indice === 1) {

            empresa.caixa -= 3000;
            empresa.satisfacao += 5;

        }

        else if (indice === 2) {

            empresa.caixa -= 5000;
            empresa.satisfacao += 8;

        }

        else {

            empresa.satisfacao -= 10;
            empresa.vendas -= 100;

        }

    }


    // ====================================
    // PROBLEMA 8
    // ====================================

    else if (problema === 7) {

        if (indice === 0) {

            empresa.caixa -= 3000;
            empresa.vendas += 150;

        }

        else if (indice === 1) {

            empresa.caixa -= 5000;
            empresa.vendas += 100;

        }

        else if (indice === 2) {

            empresa.caixa -= 8000;
            empresa.vendas += 100;
            empresa.satisfacao += 15;

        }

        else {

            empresa.vendas -= 150;
            empresa.satisfacao -= 5;

        }

    }


    // ====================================
    // PROBLEMA 9
    // ====================================

    else if (problema === 8) {

        if (indice === 0) {

            empresa.caixa -= 2000;
            empresa.estoque += 300;

        }

        else if (indice === 1) {

            empresa.caixa -= 500;
            empresa.estoque += 200;

        }

        else if (indice === 2) {

            empresa.vendas -= 100;
            empresa.satisfacao -= 5;
            empresa.caixa += 4000;

        }

        else {

            empresa.caixa -= 5000;

        }

    }


    // ====================================
    // PROBLEMA 10
    // ====================================

    else if (problema === 9) {

        if (indice === 0) {

            empresa.producao += 250;
            empresa.estoque -= 200;
            empresa.caixa -= 5000;
            empresa.satisfacao += 8;

        }

        else if (indice === 1) {

            empresa.funcionarios += 4;
            empresa.caixa -= 8000;
            empresa.producao += 200;
            empresa.rh += 10;

        }

        else if (indice === 2) {

            empresa.caixa -= 7000;
            empresa.producao += 300;
            empresa.logistica -= 5;
            empresa.satisfacao += 7;

        }

        else {

            empresa.satisfacao -= 15;
            empresa.vendas -= 150;

        }

    }


    // Atualiza os indicadores

    atualizarIndicadores();


    // Mostra o que aconteceu

    mostrarResultado(escolha, antes);

    const btn = document.getElementById("btnProximo");
    if (btn) btn.disabled = false;

}


// ========================================
// MOSTRAR RESULTADO EM TEMPO REAL
// ========================================

function mostrarResultado(escolha, antes) {

    let impactos = "";

    impactos += criarImpacto(
        "👥 RH / Funcionários",
        antes.funcionarios,
        empresa.funcionarios,
        "funcionarios"
    );

    impactos += criarImpacto(
        "💰 Financeiro",
        antes.caixa,
        empresa.caixa,
        "caixa"
    );

    impactos += criarImpacto(
        "🏭 Produção",
        antes.producao,
        empresa.producao,
        "producao"
    );

    impactos += criarImpacto(
        "📦 Estoque",
        antes.estoque,
        empresa.estoque,
        "estoque"
    );

    impactos += criarImpacto(
        "🛒 Vendas",
        antes.vendas,
        empresa.vendas,
        "vendas"
    );

    impactos += criarImpacto(
        "😊 Clientes",
        antes.satisfacao,
        empresa.satisfacao,
        "satisfacao"
    );


    document.getElementById("resultadoTempoReal").innerHTML = `

        <div class="resultado">

            <h2>⚡ Decisão aplicada!</h2>

            <div class="decisao-escolhida">

                <strong>📌 Decisão tomada:</strong>

                <p>${escolha}</p>

            </div>


            <h3>🔄 O que aconteceu com a empresa?</h3>

            <p style="margin: 10px 0 20px;">
                A decisão afetou diferentes partes da organização.
                Observe como os subsistemas estão interligados:
            </p>


            <div class="impactos">

                ${impactos}

            </div>


            <div class="fluxo">

                <h3>🔗 Teoria de Sistemas em ação</h3>

                <div class="fluxo-linha">

                    <div class="fluxo-item">
                        📥 Entrada
                    </div>

                    <div class="seta">→</div>

                    <div class="fluxo-item">
                        🧠 Decisão
                    </div>

                    <div class="seta">→</div>

                    <div class="fluxo-item">
                        🏢 Subsistemas
                    </div>

                    <div class="seta">→</div>

                    <div class="fluxo-item">
                        📤 Saída
                    </div>

                    <div class="seta">→</div>

                    <div class="fluxo-item">
                        🔄 Novo estado
                    </div>

                </div>

            </div>

        </div>

    `;


    // Faz a tela rolar até o resultado

    document.getElementById("resultadoTempoReal")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ========================================
// CRIAR CARD DE IMPACTO
// ========================================

function criarImpacto(nome, antes, depois, tipo) {

    let diferenca = depois - antes;

    let classe = "atencao";

    let simbolo = "→";

    if (diferenca > 0) {

        classe = "positivo";
        simbolo = "↑";

    }

    else if (diferenca < 0) {

        classe = "negativo";
        simbolo = "↓";

    }


    let valorAntes = antes;
    let valorDepois = depois;


    if (tipo === "caixa") {

        valorAntes =
            "R$ " + antes.toLocaleString("pt-BR");

        valorDepois =
            "R$ " + depois.toLocaleString("pt-BR");

    }

    else if (tipo === "satisfacao") {

        valorAntes = antes + "%";
        valorDepois = depois + "%";

    }


    return `

        <div class="impacto ${classe}">

            <h3>${nome}</h3>

            <p>

                <span class="valor">
                    ${valorAntes}
                </span>

                ${simbolo}

                <span class="valor">
                    ${valorDepois}
                </span>

            </p>

            <small>
                Variação: ${diferenca > 0 ? "+" : ""}${diferenca}
            </small>

        </div>

    `;

}


// ========================================
// PRÓXIMO PROBLEMA
// ========================================

function proximoProblema() {

    if (!decisaoTomada || jogoFinalizado) {
        alert("Tome uma decisão antes de continuar.");
        return;
    }

    problemaAtual++;

    if (problemaAtual >= problemas.length) {
        finalizarJogo();
        return;
    }

    mostrarProblema();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// REINICIAR JOGO
// ========================================

function reiniciarJogo() {

    empresa = {
        funcionarios: 20,
        caixa: 50000,
        producao: 1000,
        estoque: 1000,
        vendas: 1000,
        satisfacao: 75,
        logistica: 80,
        rh: 80
    };

    problemaAtual = 0;
    decisaoTomada = false;
    jogoFinalizado = false;

    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    carregarRanking();

    window.scrollTo({ top: 0, behavior: "smooth" });

}

// ========================================
// RANKING GLOBAL - VERCEL
// ========================================

function calcularPontuacao() {
    const normalizar = (valor, minimo, maximo) => {
        return Math.max(0, Math.min(100, ((valor - minimo) / (maximo - minimo)) * 100));
    };

    const financeiro = normalizar(empresa.caixa, 0, 60000);
    const satisfacao = normalizar(empresa.satisfacao, 0, 100);
    const rh = normalizar(empresa.rh, 0, 100);
    const logistica = normalizar(empresa.logistica, 0, 100);
    const producao = normalizar(empresa.producao, 500, 1800);
    const vendas = normalizar(empresa.vendas, 500, 1800);
    const estoque = 100 - Math.min(100, Math.abs(empresa.estoque - 1000) / 10);
    const funcionarios = normalizar(empresa.funcionarios, 10, 35);

    const pontos =
        financeiro * 0.20 +
        satisfacao * 0.20 +
        rh * 0.10 +
        logistica * 0.10 +
        producao * 0.10 +
        vendas * 0.15 +
        estoque * 0.05 +
        funcionarios * 0.10;

    return Math.max(0, Math.min(1000, Math.round(pontos * 10)));
}

function escaparHTML(texto) {
    return String(texto).replace(/[&<>'"]/g, (caractere) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;"
    }[caractere]));
}

async function lerRespostaJSON(resposta) {
    const texto = await resposta.text();
    let dados = {};
    try {
        dados = texto ? JSON.parse(texto) : {};
    } catch {
        throw new Error("A API do ranking não retornou JSON válido. Verifique a configuração da Vercel.");
    }
    if (!resposta.ok) {
        throw new Error(dados.erro || "Não foi possível acessar o ranking global.");
    }
    return dados;
}

async function carregarRanking() {
    const elementos = [document.getElementById("rankingInicio")];

    try {
        const resposta = await fetch("/api/ranking", { cache: "no-store" });
        const dados = await lerRespostaJSON(resposta);
        renderizarRanking(dados.ranking || [], elementos.filter(Boolean));
    } catch (erro) {
        elementos.filter(Boolean).forEach((el) => {
            el.innerHTML = `<div class="ranking-erro">⚠️ ${escaparHTML(erro.message)}</div>`;
        });
    }
}

function renderizarRanking(ranking, elementos) {
    if (!ranking.length) {
        elementos.forEach((el) => el.innerHTML = '<div class="ranking-vazio">Ainda não há gestores registrados. Seja o primeiro!</div>');
        return;
    }

    const linhas = ranking.slice(0, 10).map((item, indice) => `
        <tr>
            <td>${indice + 1}º</td>
            <td>${escaparHTML(item.nome)}</td>
            <td><strong>${item.pontuacao}</strong></td>
        </tr>
    `).join("");

    const tabela = `
        <table class="ranking-tabela">
            <thead><tr><th>#</th><th>Gestor</th><th>Pontos</th></tr></thead>
            <tbody>${linhas}</tbody>
        </table>
    `;

    elementos.forEach((el) => el.innerHTML = tabela);
}

async function enviarPontuacao(pontuacao) {
    const resposta = await fetch("/api/ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeGestor, pontuacao })
    });

    const dados = await lerRespostaJSON(resposta);
    return dados;
}

async function finalizarJogo() {
    jogoFinalizado = true;
    decisaoTomada = false;

    const pontuacao = calcularPontuacao();
    const btn = document.getElementById("btnProximo");
    if (btn) btn.disabled = true;

    document.getElementById("resultadoTempoReal").innerHTML = `
        <div class="resultado-final">
            <h2>🎉 Simulação concluída!</h2>
            <p>Gestor: <strong>${escaparHTML(nomeGestor)}</strong></p>
            <div class="pontuacao-final">${pontuacao} pontos</div>
            <div id="statusRanking" class="colocacao-final">Enviando sua pontuação para o ranking global...</div>
            <div class="ranking-final">
                <h3>🏆 Ranking Global</h3>
                <div id="rankingFinal">Carregando...</div>
            </div>
            <div class="acoes" style="margin-bottom:0;">
                <button onclick="reiniciarJogo()">🔄 Jogar novamente</button>
            </div>
        </div>
    `;

    try {
        const dados = await enviarPontuacao(pontuacao);
        const ranking = dados.ranking || [];
        const posicao = ranking.findIndex((item) => item.id === dados.resultado.id) + 1;
        const status = document.getElementById("statusRanking");
        if (status) status.textContent = posicao > 0 ? `Você ficou em ${posicao}º lugar no ranking global.` : "Pontuação registrada no ranking global.";
        renderizarRanking(ranking, [document.getElementById("rankingFinal")].filter(Boolean));
    } catch (erro) {
        const status = document.getElementById("statusRanking");
        if (status) status.innerHTML = `<span class="ranking-erro">${escaparHTML(erro.message)}</span>`;
    }

    document.getElementById("resultadoTempoReal").scrollIntoView({ behavior: "smooth" });
}

// Carrega o ranking assim que a página abre.
window.addEventListener("DOMContentLoaded", carregarRanking);
