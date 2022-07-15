/* 
RECADO:
Eu possuo um projeto pessoal que envolve rolagem de dados. 
Aproveitei a oportunidade para desenvolver um código para o meu projeto pessoal, casando com a Entrega proposta pela Kenzie.
Coloquei, dentro deste código, todos os parâmetros para cumprir com os requisitos da atividade. Exceto o teste de mesa.
Por favor, me informe se não for possível realizar uma correção para esta atividade.
*/

Rolar(1000);

function Rolar(nroDeLançamentos,nroDeDados,nroDeFaces){
    nroDeDados = nroDeDados || 2;
    nroDeFaces = nroDeFaces || 6;
    let resultsArr = rolarPilha(nroDeLançamentos, nroDeDados, nroDeFaces);
    criarHTML(nroDeLançamentos, resultsArr, nroDeDados);
}

function rolarPilha(nroDeLançamentos,nroDeDados,nroDeFaces){
    let resultsArr = criarArrayDeResultadosPossiveis(nroDeDados,nroDeFaces);
    for (let i = 0; i < nroDeLançamentos; i++) {
        let roll = rollDicePool(nroDeDados, nroDeFaces);
        resultsArr[roll - nroDeDados] += 1;
    }
    return resultsArr
};

function rollDicePool(diceQt, diceFaces){
    let result = 0;
    for (let i = 0; i < diceQt; i++) {
        result += Math.floor((Math.random() * (diceFaces)) + 1);
    }
    return result;
};

function criarArrayDeResultadosPossiveis(nro,faces){
    let arr = [];
    let resultadosPossiveis = nro * faces + (1 - nro)
    for (let i = 0; i < resultadosPossiveis; i++) {
        arr.push(0)
    }
    return arr;
};

function criarHTML(nroDeLançamentos, resultsArr, nroDeDados){
    const $diceResult = document.getElementById('diceResult');
    let HTMLData = '';
    for (let i = 0; i < resultsArr.length; i++) {
        let porcentagem = calcularPorcentagem(resultsArr[i], nroDeLançamentos);
        HTMLData += `
        <div class="result-card">
            <div class="result-data">
                <span class="result-title">Ocorrências do valor ${nroDeDados + i}: </span>
                <span class="result-value">${resultsArr[i]} / ${nroDeLançamentos}</span>
            </div>
            <div class="grafico">
                <div class="grafico-value" style="width:${porcentagem}%">
                    <span class="grafico-value-porc">${porcentagem}%</span>
                </div>
            </div>
        </div>
        `        
    }
    $diceResult.innerHTML = HTMLData;
};

function calcularPorcentagem(valor, total){
    return valor * 100 / total
};