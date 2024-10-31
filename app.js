let listadenumerossorteados = [];
let numerolimite = 10;
let numerosecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}

exibirMensagemInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numerosecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    } else {
        if (chute > numerosecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroescolhido = parseInt(Math.random() * numerolimite + 1);
    let qtdnumeroslista = listadenumerossorteados.length;

    if(qtdnumeroslista == numerolimite) {
        listadenumerossorteados = [];
    }

    if(listadenumerossorteados.includes(numeroescolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listadenumerossorteados.push(numeroescolhido);
        return numeroescolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numerosecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disable", true);
}