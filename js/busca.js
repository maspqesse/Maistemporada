// ========================================
// TEMPORADA SE
// SISTEMA DE BUSCA
// ========================================


// ----------------------------------------
// DADOS DOS IMÓVEIS
// ----------------------------------------

const imoveis = [

    {
        id: 1,

        nome:
            "Casa aconchegante perto da praia",

        cidade:
            "Barra dos Coqueiros",

        preco:
            350,

        quartos:
            3,

        banheiros:
            2,

        hospedes:
            8,

        avaliacao:
            4.9,

        piscina:
            true,

        churrasqueira:
            true,

        wifi:
            true,

        imagem:
            "result-image-1",

        emoji:
            "🏖️"
    },


    {
        id: 2,

        nome:
            "Refúgio com piscina",

        cidade:
            "Barra dos Coqueiros",

        preco:
            480,

        quartos:
            4,

        banheiros:
            3,

        hospedes:
            10,

        avaliacao:
            4.8,

        piscina:
            true,

        churrasqueira:
            true,

        wifi:
            true,

        imagem:
            "result-image-2",

        emoji:
            "🏊"
    },


    {
        id: 3,

        nome:
            "Casa com vista para o mar",

        cidade:
            "Praia do Saco",

        preco:
            420,

        quartos:
            3,

        banheiros:
            2,

        hospedes:
            7,

        avaliacao:
            4.9,

        piscina:
            false,

        churrasqueira:
            true,

        wifi:
            true,

        imagem:
            "result-image-3",

        emoji:
            "🌊"
    },


    {
        id: 4,

        nome:
            "Casa moderna para família",

        cidade:
            "Aracaju",

        preco:
            290,

        quartos:
            3,

        banheiros:
            2,

        hospedes:
            6,

        avaliacao:
            4.7,

        piscina:
            true,

        churrasqueira:
            false,

        wifi:
            true,

        imagem:
            "result-image-4",

        emoji:
            "🏠"
    },


    {
        id: 5,

        nome:
            "Chalé cercado pela natureza",

        cidade:
            "Itaporanga d'Ajuda",

        preco:
            260,

        quartos:
            2,

        banheiros:
            1,

        hospedes:
            5,

        avaliacao:
            4.8,

        piscina:
            false,

        churrasqueira:
            true,

        wifi:
            true,

        imagem:
            "result-image-5",

        emoji:
            "🌴"
    },


    {
        id: 6,

        nome:
            "Casa grande para grupos",

        cidade:
            "Barra dos Coqueiros",

        preco:
            550,

        quartos:
            5,

        banheiros:
            4,

        hospedes:
            12,

        avaliacao:
            5.0,

        piscina:
            true,

        churrasqueira:
            true,

        wifi:
            true,

        imagem:
            "result-image-6",

        emoji:
            "🏡"
    }

];


// ----------------------------------------
// CAPTURAR PARÂMETROS DA URL
// ----------------------------------------

const parametros =
    new URLSearchParams(
        window.location.search
    );


const destino =
    parametros.get("destino");


const entrada =
    parametros.get("entrada");


const saida =
    parametros.get("saida");


const hospedes =
    parametros.get("hospedes");


// ----------------------------------------
// ELEMENTOS DA PÁGINA
// ----------------------------------------

const resultsGrid =
    document.getElementById(
        "resultsGrid"
    );


const resultCount =
    document.getElementById(
        "resultCount"
    );


const searchDescription =
    document.getElementById(
        "searchDescription"
    );


const noResults =
    document.getElementById(
        "noResults"
    );


const ordenacao =
    document.getElementById(
        "ordenacao"
    );


// ----------------------------------------
// DESCRIÇÃO DA BUSCA
// ----------------------------------------

function atualizarDescricao() {

    let texto =
        destino
            ? `Encontramos imóveis em ${destino}`
            : "Confira nossas opções de hospedagem";


    if (hospedes) {

        texto +=
            ` para ${hospedes} hóspedes`;

    }


    searchDescription.textContent =
        texto;

}


// ----------------------------------------
// FILTRAR POR DESTINO
// ----------------------------------------

function filtrarPorDestino() {

    if (!destino) {

        return imoveis;

    }


    const busca =
        destino.toLowerCase();


    const encontrados =
        imoveis.filter(
            function (imovel) {

                return (
                    imovel.cidade
                        .toLowerCase()
                        .includes(busca)
                );

            }
        );


    // Se não houver imóvel naquela cidade,
    // mostramos todos os imóveis como demonstração.

    if (encontrados.length === 0) {

        return imoveis;

    }


    return encontrados;

}


// ----------------------------------------
// CRIAR CARD
// ----------------------------------------

function criarCard(imovel) {

    return `

        <article class="result-card">

            <div
                class="result-image ${imovel.imagem}"
            >

                <span>
                    ${imovel.emoji}
                </span>

                <button
                    class="result-favorite"
                    data-id="${imovel.id}"
                    title="Adicionar aos favoritos"
                >
                    ♡
                </button>

            </div>


            <div class="result-content">

                <div class="result-location">

                    📍 ${imovel.cidade} - SE

                </div>


                <h2>

                    ${imovel.nome}

                </h2>


                <p class="result-details">

                    ${imovel.quartos} quartos
                    ·
                    ${imovel.banheiros} banheiros
                    ·
                    ${imovel.hospedes} hóspedes

                </p>


                <div class="result-bottom">

                    <div class="result-price">

                        <strong>
                            R$ ${imovel.preco}
                        </strong>

                        <span>
                            / noite
                        </span>

                    </div>


                    <div class="result-rating">

                        ⭐ ${imovel.avaliacao}

                    </div>

                </div>


                <a
                    href="imovel.html?id=${imovel.id}"
                    class="view-property"
                >
                    Ver imóvel
                </a>

            </div>

        </article>

    `;

}


// ----------------------------------------
// RENDERIZAR IMÓVEIS
// ----------------------------------------

function renderizarImoveis(lista) {

    resultsGrid.innerHTML = "";


    if (lista.length === 0) {

        noResults.style.display =
            "block";

        resultCount.textContent =
            "0 imóveis encontrados";

        return;

    }


    noResults.style.display =
        "none";


    resultCount.textContent =
        `${lista.length} imóveis encontrados`;


    lista.forEach(
        function (imovel) {

            resultsGrid.innerHTML +=
                criarCard(imovel);

        }
    );


    ativarFavoritos();

}


// ----------------------------------------
// FAVORITOS
// ----------------------------------------

function ativarFavoritos() {

    const botoes =
        document.querySelectorAll(
            ".result-favorite"
        );


    botoes.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    if (
                        botao.textContent.trim()
                        ===
                        "♡"
                    ) {

                        botao.textContent =
                            "♥";

                        botao.style.color =
                            "#ef4444";

                    } else {

                        botao.textContent =
                            "♡";

                        botao.style.color =
                            "";

                    }

                }
            );

        }
    );

}


// ----------------------------------------
// FILTROS
// ----------------------------------------

const botoesFiltro =
    document.querySelectorAll(
        ".filter-button"
    );


botoesFiltro.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                botoesFiltro.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                botao.classList.add(
                    "active"
                );


                const filtro =
                    botao.dataset.filter;


                let lista =
                    filtrarPorDestino();


                if (
                    filtro === "piscina"
                ) {

                    lista =
                        lista.filter(
                            imovel =>
                                imovel.piscina
                        );

                }


                if (
                    filtro === "churrasqueira"
                ) {

                    lista =
                        lista.filter(
                            imovel =>
                                imovel.churrasqueira
                        );

                }


                if (
                    filtro === "wifi"
                ) {

                    lista =
                        lista.filter(
                            imovel =>
                                imovel.wifi
                        );

                }


                if (
                    filtro === "barato"
                ) {

                    lista.sort(
                        (
                            a,
                            b
                        ) =>
                            a.preco -
                            b.preco
                    );

                }


                renderizarImoveis(
                    lista
                );

            }
        );

    }
);


// ----------------------------------------
// ORDENAÇÃO
// ----------------------------------------

ordenacao.addEventListener(
    "change",
    function () {

        let lista =
            filtrarPorDestino();


        if (
            ordenacao.value ===
            "menor-preco"
        ) {

            lista.sort(
                (a, b) =>
                    a.preco -
                    b.preco
            );

        }


        if (
            ordenacao.value ===
            "maior-preco"
        ) {

            lista.sort(
                (a, b) =>
                    b.preco -
                    a.preco
            );

        }


        if (
            ordenacao.value ===
            "avaliacao"
        ) {

            lista.sort(
                (a, b) =>
                    b.avaliacao -
                    a.avaliacao
            );

        }


        renderizarImoveis(
            lista
        );

    }
);


// ----------------------------------------
// ALTERAR BUSCA
// ----------------------------------------

document
    .getElementById("editarBusca")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "../index.html#inicio";

        }
    );


// ----------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------

atualizarDescricao();

renderizarImoveis(
    filtrarPorDestino()
);
