// ========================================
// TEMPORADA SE
// SISTEMA DE DETALHES DO IMÓVEL
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

        proprietario:
            "João",

        avaliacoes:
            12
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

        proprietario:
            "Mariana",

        avaliacoes:
            18
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

        proprietario:
            "Carlos",

        avaliacoes:
            25
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

        proprietario:
            "Ana",

        avaliacoes:
            9
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

        proprietario:
            "Pedro",

        avaliacoes:
            14
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

        proprietario:
            "Lucas",

        avaliacoes:
            31
    }

];


// ----------------------------------------
// PEGAR ID DO IMÓVEL
// ----------------------------------------

const parametros =
    new URLSearchParams(
        window.location.search
    );


const id =
    Number(
        parametros.get("id")
    );


// ----------------------------------------
// ENCONTRAR IMÓVEL
// ----------------------------------------

const imovel =
    imoveis.find(
        function (item) {

            return item.id === id;

        }
    );


// ----------------------------------------
// ELEMENTOS DA PÁGINA
// ----------------------------------------

const propertyTitle =
    document.getElementById(
        "propertyTitle"
    );


const propertyRating =
    document.getElementById(
        "propertyRating"
    );


const ownerName =
    document.getElementById(
        "ownerName"
    );


const propertyPrice =
    document.getElementById(
        "propertyPrice"
    );


const bookingButton =
    document.getElementById(
        "bookingButton"
    );


const favoriteButton =
    document.getElementById(
        "favoriteButton"
    );


const shareButton =
    document.getElementById(
        "shareButton"
    );


const checkin =
    document.getElementById(
        "checkin"
    );


const checkout =
    document.getElementById(
        "checkout"
    );


const bookingGuests =
    document.getElementById(
        "bookingGuests"
    );


const bookingTotal =
    document.getElementById(
        "bookingTotal"
    );


// ----------------------------------------
// VERIFICAR SE O IMÓVEL EXISTE
// ----------------------------------------

if (!imovel) {

    document.querySelector(
        ".property-page"
    ).innerHTML = `

        <div
            class="container"
            style="
                padding: 100px 20px;
                text-align: center;
            "
        >

            <h1>
                Imóvel não encontrado
            </h1>

            <p
                style="
                    margin: 15px 0 25px;
                    color: #64748b;
                "
            >
                O imóvel que você tentou acessar
                não está disponível.
            </p>

            <a
                href="busca.html"
                class="btn btn-primary"
            >
                Voltar para busca
            </a>

        </div>

    `;

}


// ----------------------------------------
// PREENCHER DADOS DO IMÓVEL
// ----------------------------------------

function carregarImovel() {

    if (!imovel) {

        return;

    }


    propertyTitle.textContent =
        imovel.nome;


    propertyRating.textContent =
        imovel.avaliacao;


    ownerName.textContent =
        imovel.proprietario;


    propertyPrice.textContent =
        formatarMoeda(
            imovel.preco
        );


    document.title =
        `${imovel.nome} | Temporada SE`;

}


// ----------------------------------------
// FORMATAR DINHEIRO
// ----------------------------------------

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ----------------------------------------
// DATA MÍNIMA
// ----------------------------------------

function configurarDatas() {

    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );


    const dataHoje =
        `${ano}-${mes}-${dia}`;


    checkin.min =
        dataHoje;


    checkout.min =
        dataHoje;


    // Quando escolher entrada,
    // a saída não poderá ser anterior.

    checkin.addEventListener(
        "change",
        function () {

            checkout.min =
                checkin.value;


            if (
                checkout.value &&
                checkout.value <= checkin.value
            ) {

                checkout.value =
                    "";

            }


            calcularReserva();

        }
    );


    checkout.addEventListener(
        "change",
        function () {

            calcularReserva();

        }
    );


    bookingGuests.addEventListener(
        "change",
        function () {

            validarHospedes();

        }
    );

}


// ----------------------------------------
// VALIDAR HÓSPEDES
// ----------------------------------------

function validarHospedes() {

    const quantidade =
        Number(
            bookingGuests.value
        );


    if (
        quantidade >
        imovel.hospedes
    ) {

        alert(
            `Este imóvel comporta no máximo ${imovel.hospedes} hóspedes.`
        );


        bookingGuests.value =
            imovel.hospedes;

    }

}


// ----------------------------------------
// CALCULAR NOITES
// ----------------------------------------

function calcularNoites(
    entrada,
    saida
) {

    const inicio =
        new Date(
            entrada + "T00:00:00"
        );


    const fim =
        new Date(
            saida + "T00:00:00"
        );


    const diferenca =
        fim - inicio;


    const noites =
        Math.ceil(
            diferenca /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    return noites;

}


// ----------------------------------------
// CALCULAR RESERVA
// ----------------------------------------

function calcularReserva() {

    if (
        !checkin.value ||
        !checkout.value
    ) {

        return;

    }


    const entrada =
        checkin.value;


    const saida =
        checkout.value;


    const noites =
        calcularNoites(
            entrada,
            saida
        );


    if (
        noites <= 0
    ) {

        alert(
            "A data de saída deve ser posterior à data de entrada."
        );


        checkout.value =
            "";

        return;

    }


    const valorHospedagem =
        imovel.preco *
        noites;


    const taxaServico =
        valorHospedagem *
        0.10;


    const total =
        valorHospedagem +
        taxaServico;


    atualizarResumoReserva(
        noites,
        valorHospedagem,
        taxaServico,
        total
    );

}


// ----------------------------------------
// ATUALIZAR RESUMO
// ----------------------------------------

function atualizarResumoReserva(
    noites,
    hospedagem,
    taxa,
    total
) {

    bookingTotal.innerHTML = `

        <div>

            <span>
                ${formatarMoeda(imovel.preco)}
                ×
                ${noites}
                ${noites === 1 ? "noite" : "noites"}
            </span>

            <strong>
                ${formatarMoeda(hospedagem)}
            </strong>

        </div>


        <div>

            <span>
                Taxa de serviço
            </span>

            <strong>
                ${formatarMoeda(taxa)}
            </strong>

        </div>


        <div class="total-final">

            <span>
                Total
            </span>

            <strong>
                ${formatarMoeda(total)}
            </strong>

        </div>

    `;

}


// ----------------------------------------
// FAVORITAR
// ----------------------------------------

favoriteButton.addEventListener(
    "click",
    function () {

        const favoritado =
            favoriteButton.classList.toggle(
                "favorited"
            );


        if (favoritado) {

            favoriteButton.innerHTML =
                "♥ Favoritado";

            favoriteButton.style.color =
                "#ef4444";

        } else {

            favoriteButton.innerHTML =
                "♡ Favoritar";

            favoriteButton.style.color =
                "";

        }

    }
);


// ----------------------------------------
// COMPARTILHAR
// ----------------------------------------

shareButton.addEventListener(
    "click",
    async function () {

        const url =
            window.location.href;


        if (
            navigator.share
        ) {

            try {

                await navigator.share({

                    title:
                        imovel.nome,

                    text:
                        `Confira este imóvel no Temporada SE: ${imovel.nome}`,

                    url:
                        url

                });

            } catch (erro) {

                console.log(
                    "Compartilhamento cancelado."
                );

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    url
                );


                alert(
                    "Link do imóvel copiado!"
                );

            } catch (erro) {

                alert(
                    "Não foi possível copiar o link."
                );

            }

        }

    }
);


// ----------------------------------------
// SOLICITAR RESERVA
// ----------------------------------------

bookingButton.addEventListener(
    "click",
    function () {

        if (
            !checkin.value ||
            !checkout.value
        ) {

            alert(
                "Selecione as datas de entrada e saída."
            );

            return;

        }


        const quantidade =
            Number(
                bookingGuests.value
            );


        if (
            quantidade >
            imovel.hospedes
        ) {

            alert(
                `Este imóvel aceita no máximo ${imovel.hospedes} hóspedes.`
            );

            return;

        }


        const noites =
            calcularNoites(
                checkin.value,
                checkout.value
            );


        if (
            noites <= 0
        ) {

            alert(
                "Verifique as datas escolhidas."
            );

            return;

        }


        // Salvar os dados da reserva
        // para usar na próxima tela.

        const reserva = {

            imovelId:
                imovel.id,

            imovel:
                imovel.nome,

            entrada:
                checkin.value,

            saida:
                checkout.value,

            hospedes:
                quantidade,

            noites:
                noites,

            valorNoite:
                imovel.preco,

            valorTotal:
                (
                    imovel.preco *
                    noites *
                    1.10
                )

        };


        localStorage.setItem(
            "reservaTemporadaSE",
            JSON.stringify(
                reserva
            )
        );


        // Por enquanto vamos
        // encaminhar para login.

        window.location.href =
            "login.html";

    }
);


// ----------------------------------------
// INICIALIZAR
// ----------------------------------------

carregarImovel();

configurarDatas();
