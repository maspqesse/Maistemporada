// ========================================
// TEMPORADA SE
// JavaScript principal
// ========================================


// ----------------------------------------
// BUSCA DE IMÓVEIS
// ----------------------------------------

const botaoBuscar = document.getElementById("btnBuscar");

const campoDestino = document.getElementById("destino");

const campoEntrada = document.getElementById("entrada");

const campoSaida = document.getElementById("saida");

const campoHospedes = document.getElementById("hospedes");


botaoBuscar.addEventListener("click", function () {

    const destino = campoDestino.value.trim();

    const entrada = campoEntrada.value;

    const saida = campoSaida.value;

    const hospedes = campoHospedes.value;


    // Verifica se o destino foi preenchido

    if (destino === "") {

        alert(
            "Digite o destino da sua viagem."
        );

        campoDestino.focus();

        return;
    }


    // Verifica se a data de entrada foi preenchida

    if (entrada === "") {

        alert(
            "Escolha a data de entrada."
        );

        campoEntrada.focus();

        return;
    }


    // Verifica se a data de saída foi preenchida

    if (saida === "") {

        alert(
            "Escolha a data de saída."
        );

        campoSaida.focus();

        return;
    }


    // Verifica se a saída é depois da entrada

    if (saida <= entrada) {

        alert(
            "A data de saída deve ser posterior à data de entrada."
        );

        campoSaida.focus();

        return;
    }


    console.log("Busca realizada:");

    console.log({
        destino: destino,
        entrada: entrada,
        saida: saida,
        hospedes: hospedes
    });


   window.location.href =
    `pages/busca.html?destino=${encodeURIComponent(destino)}&entrada=${entrada}&saida=${saida}&hospedes=${hospedes}`;

});


// ----------------------------------------
// FAVORITOS
// ----------------------------------------

const botoesFavoritos =
    document.querySelectorAll(".favorite");


botoesFavoritos.forEach(function (botao) {

    botao.addEventListener("click", function () {

        if (botao.textContent.trim() === "♡") {

            botao.textContent = "♥";

            botao.style.color = "#ef4444";

        } else {

            botao.textContent = "♡";

            botao.style.color = "";

        }

    });

});


// ----------------------------------------
// ANO AUTOMÁTICO DO FOOTER
// ----------------------------------------

const anoAtual = new Date().getFullYear();

const textoFooter =
    document.querySelector(".footer-bottom p");


if (textoFooter) {

    textoFooter.textContent =
        `© ${anoAtual} Temporada SE. Projeto acadêmico MAISTI/UFS.`;

}
