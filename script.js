/* declaração dos elementos*/
let seuVotoPara = document.querySelector('.divisao-1-left-1 span');
let cargo = document.querySelector('.divisao-1-left-2 span');
let numeros = document.querySelector('.divisao-1-left-3');
let descricao = document.querySelector('.divisao-1-left-4');
let lateral = document.querySelector('.divisao-1-right');
let aviso = document.querySelector('.divisao-2');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// pagina inicial
function comecarEtapa() {
    let etapa = etapas[etapaAtual]; // pega informações do item do json

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(i=0; i<etapa.numeros; i++) { // espaços de numeros na tela, atribui o pisca pro proximo espaço sem nº
        if (i === 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else {
            numeroHTML += '<div class="numero"></div>'
        }
        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function clicou(n) {
    let elementoNumero = document.querySelector('.divisao-1-left-3 .numero.pisca'); // seleciona caixa pisca
    if(elementoNumero !== null){ //se caixa pisca for diferente de null atribui valor da tecla clickada
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`; // concatenação dos digitos

        elementoNumero.classList.remove('pisca'); // remove class pisca
        if(elementoNumero.nextElementSibling !== null) { //
            elementoNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    }
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    // verificação do numero digitado com numero da lista de candidato
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    })
    //se tiver achar candidato mostre as informações
    if(candidato.length > 0) { 
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        

        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHTML += `<div class="divisao-1-image small"><img src="./images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="divisao-1-image"><img src="./images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
            
        } 
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
    }
}


function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = ''
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`;
    } else {
        alert('Para votar em BRANCO, não pode ter digitado nenhum número!')
    }
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }
    if(votoConfirmado === true) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante">FIM</div>`
            console.log(votos);
            document.querySelector('.teclado--botao.botao--branco').setAttribute('onclick', '') ;
            document.querySelector('.teclado--botao.botao--corrige').setAttribute('onclick', '') ;
            document.querySelector('.teclado--botao.botao--confirma').setAttribute('onclick', '') ;
        }
    }
}

comecarEtapa();