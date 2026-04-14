const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("textBoxOutput");
//const SUBMIT_BUTTON = document.getElementById("submitButton");const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
let userText = "";
let outputText = "";

function buttonSubmitClick(){
    console.log(Check.getToLowerCase, Check.getToUpperCase, Check.getToFirstLetter, Check.getToLowerCase)
}

const updateTextInput = {
    getInvertedText: function(textBoxInput){
        TEXT_BOX_OUTPUT.value = textInverter(textBoxInput);
    },
    getCaptalizedText: function(textBoxInput){
        TEXT_BOX_OUTPUT.value = textCaptilizer(textBoxInput);
    }
}

const Check = {
    getCarteirinha: false,
    getToLowerCase: false,
    getToUpperCase: false,
    getToFirstLetter: false,
    
    checkThis: function verifyChecked(name){
        if(name == 'checkboxCaps'){
            Check.getToLowerCase = document.querySelector(`input[id="getToLowerCase"`).checked;
            Check.getCarteirinha = document.querySelector(`input[id="getCarteirinha"`).checked;
            Check.getToUpperCase = document.querySelector(`input[id="getToUpperCase"`).checked;
            Check.getToFirstLetter = document.querySelector(`input[id="getToFirstLetter"`).checked;
            TEXT_BOX_OUTPUT.value = textCaptilizer(TEXT_BOX_INPUT.value)
            if(!Check.getCarteirinha){
                for (const el of document.querySelectorAll(".textBoxes textarea")) {
                    el.classList.remove("carteira");
                }
            }
        }
    }
}

function textCaptilizer(textBoxInput){
    if(Check.getToLowerCase){
        textBoxInput = textBoxInput.toLowerCase();
    } else if (Check.getToUpperCase) {
        textBoxInput = textBoxInput.toUpperCase();
    } else if (Check.getToFirstLetter) {
        textBoxInput = toFirstLetter(textBoxInput);
    } else if (Check.getCarteirinha) {
        
        for (const el of document.querySelectorAll(".textBoxes textarea")) {
            el.classList.add("carteira");
        }
        textBoxInput = carteirinha(textBoxInput);
    }
    return textBoxInput;
}

function toFirstLetter(textBoxInput){
    textBoxInput = textBoxInput.trim().toLowerCase();
    let wordNumber = 1;
    let strings = textBoxInput.split(' ');

    for(let i=0; i<=textBoxInput.length; i++){
        if(textBoxInput.charAt(i)==' '){
            wordNumber++;
        }
    }

    textBoxInput = '';

    for(let i=0; i<wordNumber; i++){
        strings[i] = strings[i].charAt(0).toUpperCase()+strings[i].slice(1);
        textBoxInput += i==wordNumber-1? strings[i]: strings[i] + ' ';
    }
    return textBoxInput;
}

function corrigirNome(nome) {
    const correcoes = {
        'JOAO': 'JOÃO',
        'CONCEICAO': 'CONCEIÇÃO',
        'GONCALVES': 'GONÇALVES',
        'PAIXAO': 'PAIXÃO',
        'BRANDAO': 'BRANDÃO',
        'JOSE': 'JOSÉ',
        'SA': 'SÁ'
    };

    return nome.split(' ')
        .map(p => correcoes[p] || p)
        .join(' ');
}

function carteirinha(textBoxInput) {
    const text = corrigirNome(textBoxInput);
    console.log(text);

    // pega todos os nomes
    const nomes = [...text.matchAll(/(?:Nome|N0me|d0me|dome):\s*([A-ZÀ-Ü\s-]+)/gi)]
        .map(m => {
            let nome = m[1]
                .replace(/-/g, '')           // remove hífen
                .replace(/\s+/g, ' ')
                .trim();

            nome = nome.split(' ')
                .filter(p => /^[A-ZÀ-Ü]{2,}$/.test(p))
                .join(' ');

            return nome;
        });

    // data de nascimento (mais robusto)
    const nascimentoMatch = text.match(
        /(?:Data de Nascimento|Data|Nascimento):\s*([\dIiSsOo]{1,2}\/[\dIiSsOo]{1,2}\/[\dIiSsOo]{4})/i
    );

    let nascimento = null;

    if (nascimentoMatch) {
    nascimento = nascimentoMatch[1]
        .replace(/[iI]/g, "1")
        .replace(/[oO]/g, "0")
        .replace(/[sS]/g, "5");

        // opcional: padronizar (ex: 5/1/2013 → 05/01/2013)
        const [d, m, y] = nascimento.split('/');
        nascimento = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    }
    const nomesUnicos = [];

    for (const nome of nomes) {
        const normalizado = nome
        .replace(/[^A-ZÀ-Ü\s]/gi, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toUpperCase();

    if (!nomesUnicos.some(n =>
        n.replace(/[^A-ZÀ-Ü\s]/gi, '').replace(/\s+/g, ' ').trim().toUpperCase() === normalizado
    )) {
        nomesUnicos.push(nome);
    }
}

const estudante = nomesUnicos[0] || "";
const pais = nomesUnicos.slice(1, 3);

const data = {
    estudante: toFirstLetter(estudante),
    filiacao1: toFirstLetter(pais[0] || ""),
    filiacao2: toFirstLetter(pais[1] || ""),
    nascimento
};

    console.log(data);

    return `${data.estudante}
${data.filiacao1}
${data.filiacao2}
${data.nascimento}`;
}


function textInverter(textBoxInput){
    outputText = "";
    userText = textBoxInput;
    for(const c of userText){
        outputText = c + outputText;
    }   
    return outputText;
}