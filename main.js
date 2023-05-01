const containerJogo = document.querySelector(".container-jogo");
const botaoPlay = document.querySelector(".play");
botaoPlay.addEventListener('click', iniciajogo);
const mensagemVitoria = document.querySelector(".mensagem-vitoria");
var cont = 0;
var contVitoria = 0;
var arrayCardsVirados = [];
var animais = [
    "imagens/coala.png",
    "imagens/elefante.png",
    "imagens/girafa.png",
    "imagens/hipopotamo.png",
    "imagens/macaco.png",
    "imagens/ovelha.png",
    "imagens/panda.png",
    "imagens/urso1.png",
    "imagens/urso2.png",
    "imagens/veado.png",
    "imagens/coala.png",
    "imagens/elefante.png",
    "imagens/girafa.png",
    "imagens/hipopotamo.png",
    "imagens/macaco.png",
    "imagens/ovelha.png",
    "imagens/panda.png",
    "imagens/urso1.png",
    "imagens/urso2.png",
    "imagens/veado.png"
];

function iniciajogo() {
    botaoPlay.classList.add("botaoDisplayOff");
    //cria container para os dois cards frente e verso
    for (let i = 0; i < animais.length; i++) {
        var novaDivCarta = document.createElement("div");
        containerJogo.appendChild(novaDivCarta);
    }

    //cria os pares de cards para fazer o efeito de flip
    const containerPares = document.querySelectorAll(".container-jogo div");

    containerPares.forEach((elemento) => {
        var card1 = document.createElement("div");
        var card2 = document.createElement("div");
        //adiciona a tag imagem ao front-card e a sigla MG ao back-card
        var novaImagem = document.createElement("img");
        card1.appendChild(novaImagem);
        card2.innerText = "MG";

        elemento.appendChild(card1);
        elemento.appendChild(card2);

        elemento.addEventListener('click', () => {
            elemento.classList.add("flip-card");
            cont++;
            arrayCardsVirados.push(elemento);
            //o if seguinte conserta o bug de clicar duas vezes bem rápido na mesma imagem e ela ficar visível

            if (cont == 2 && (arrayCardsVirados[0].firstElementChild.dataset.animal === arrayCardsVirados[1].firstElementChild.dataset.animal + "Par" || arrayCardsVirados[0].firstElementChild.dataset.animal + "Par" === arrayCardsVirados[1].firstElementChild.dataset.animal)) {
                cont = 0;
                //trava os elementos após ocorrer o pareamento correto, para o cursor não poder clicar novamente
                arrayCardsVirados[0].setAttribute("style", "pointer-events: none;");
                arrayCardsVirados[1].setAttribute("style", "pointer-events: none;");
                arrayCardsVirados[0].firstElementChild.setAttribute("style", "background-color: green;");
                arrayCardsVirados[1].firstElementChild.setAttribute("style", "background-color: green;");
                arrayCardsVirados.splice(0, 2);
                contVitoria++;
                if(contVitoria == 10){
                    mensagemVitoria.textContent = "PARABÉNS, VOCÊ GANHOU!!!!"
                }
            } else if (cont == 2) {
                cont = 0;
                arrayCardsVirados[0].firstElementChild.setAttribute("style", "background-color: red;");
                arrayCardsVirados[1].firstElementChild.setAttribute("style", "background-color: red;");
                setTimeout(() => {
                    arrayCardsVirados[0].classList.remove("flip-card");
                    arrayCardsVirados[1].classList.remove("flip-card");
                    arrayCardsVirados[0].firstElementChild.setAttribute("style", "background-color: rgb(177, 237, 248);");
                    arrayCardsVirados[1].firstElementChild.setAttribute("style", "background-color: rgb(177, 237, 248);");
                    arrayCardsVirados.splice(0, 2);
                }, 1000);
            }

        });
    });

    const imagem = document.querySelectorAll("img");
    //adiciona imagens e data-atributes
    var animaisAleatorios = [];
    imagem.forEach(elemento => {
        var indiceAleatorio = Math.round(Math.random() * (animais.length - 1));
        var animal = animais[indiceAleatorio];
        elemento.src = animal;
        animal = animal.replace(/imagens\/|\.png/g, "");

        if (animaisAleatorios.includes(animal)) {
            animal += "Par";
            elemento.parentElement.setAttribute("data-animal", animal);
        }
        else {
            elemento.parentElement.setAttribute("data-animal", animal);
        }
        animais.splice(indiceAleatorio, 1);
        animaisAleatorios.push(animal);
    });



}


