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

function carteirinha(textBoxInput) {
    const text = textBoxInput;

    // pega todos os nomes
    const nomes = [...text.matchAll(
    /(?:Nome|N0me):\s*([A-ZÀ-Ü][A-ZÀ-Ü\s\n]+?)(?=\n\s*(?:Nome|N0me|Filia|Data|G[eê]nero|$))/gi
)].map(m => m[1].replace(/\s+/g, ' ').trim());
    console.log(nomes);

    // data de nascimento (mais robusto)
    const nascimentoMatch = text.match(/Data de Nascimento:\s*([\dIiSsOo\/]+)/i);

    let nascimento = null;
    if (nascimentoMatch) {
        nascimento = nascimentoMatch[1]
            .replace(/[iI]/g, "1")
            .replace(/[oO]/g, "0")
            .replace(/[sS]/g, "5");
    }

    const data = {
        estudante: toFirstLetter(nomes[0] || ""),
        filiacao1: toFirstLetter(nomes[2] || ""),
        filiacao2: toFirstLetter(nomes[1] || ""),
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