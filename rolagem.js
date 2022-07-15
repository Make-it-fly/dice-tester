
empregarEventoBotão();
Rolar()
function Rolar(){
    const $qt_testes = document.getElementById('qt-testes');
    const $qt_dados = document.getElementById('qt-dados');
    const $qt_faces = document.getElementById('qt-faces');
    if ($qt_testes.value != '' && $qt_dados.value != '' && $qt_faces.value != '') {
        let nroDeLançamentos = parseInt($qt_testes.value || 1000);
        let nroDeDados = parseInt($qt_dados.value || 2);
        let nroDeFaces = parseInt($qt_faces.value || 6);
        let resultsArr = rolarPilha(nroDeLançamentos, nroDeDados, nroDeFaces);
        criarHTML(nroDeLançamentos, resultsArr, nroDeDados, nroDeFaces);
    }
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

function criarHTML(nroDeLançamentos, resultsArr, nroDeDados, nroDeFaces){
    const $diceResult = document.getElementById('diceResult');
    const $descriptionWindow = document.getElementById('description-window');
    let descriptionHTMLData = `
        <p class="description">​Dados: ${nroDeDados}</p>
        <p class="description">Faces: ${nroDeFaces}</p>
        <p class="description">Quantos testes: ${nroDeLançamentos}</p>
    `;
    let resultCardHTMLData = '';
    for (let i = 0; i < resultsArr.length; i++) {
        let porcentagem = calcularPorcentagem(resultsArr[i], nroDeLançamentos);
        resultCardHTMLData += `
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
    $diceResult.innerHTML = resultCardHTMLData;
    $descriptionWindow.innerHTML = descriptionHTMLData;
};

function calcularPorcentagem(valor, total){
    return valor * 100 / total
};

function empregarEventoBotão(){
    const $btn = document.getElementById('roll-btn');
    $btn.addEventListener('click',Rolar)
}