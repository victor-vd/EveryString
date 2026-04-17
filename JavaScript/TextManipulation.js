const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("textBoxOutput");
// const SUBMIT_BUTTON = document.getElementById("submitButton");const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
let userText = "";
let outputText = "";

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
            Check.getToLowerCase = document.querySelector(`input[id="getToLowerCase"]`).checked;
            Check.getCarteirinha = document.querySelector(`input[id="getCarteirinha"]`).checked;
            Check.getToUpperCase = document.querySelector(`input[id="getToUpperCase"]`).checked;
            Check.getToFirstLetter = document.querySelector(`input[id="getToFirstLetter"]`).checked;
            TEXT_BOX_OUTPUT.value = textCaptilizer(TEXT_BOX_INPUT.value)
            if(!Check.getCarteirinha){
                for (const el of document.querySelectorAll(".textBoxes textarea")) {
                    el.classList.remove("carteira");
                }
            }
        }
    }
}

function buttonSubmitClick(){
    console.log(Check.getToLowerCase, Check.getToUpperCase, Check.getToFirstLetter, Check.getToLowerCase)
}

function textCaptilizer(textBoxInput){
    if(Check.getCarteirinha){
        document.querySelectorAll(".textBoxes textarea")
            .forEach(el => el.classList.add("carteira"));

        return carteirinha(textBoxInput);
    }

    document.querySelectorAll(".textBoxes textarea")
        .forEach(el => el.classList.remove("carteira"));

    if(Check.getToLowerCase){
        return textBoxInput.toLowerCase();
    }

    if (Check.getToUpperCase) {
        return textBoxInput.toUpperCase();
    }

    if (Check.getToFirstLetter) {
        return toFirstLetter(textBoxInput);
    }

    return textBoxInput;
}

function extrairDadosRenv(text) {
console.log(text);

    // 1. Limpeza total para busca
    const cleanedText = text.map(line => line.replaceAll('O', '0').replaceAll('I', '1').replaceAll('S', '5'));

    const schoolId = cleanedText.find(l =>
        /^[0-9O]{8}$/.test(l)
    );
    const regex = new RegExp(`(?<![A-Za-z])${schoolId}(?![A-Za-z])`, "g");    
    const startIndex = cleanedText.findIndex(l => l.match(regex));

    if (startIndex === -1) return null;

    const lines = text.slice(startIndex);
    const estudante = lines[1];

    let date = null;

    for (const line of lines) {
        const normalizedLine = line
            .replace(/[oO]/g, "0")
            .replace(/[iI]/g, "1")
            .replace(/[sS]/g, "5");

        const matchDate = normalizedLine.match(/\d{2}\/\d{2}\/\d{4}/);
        
        if (matchDate) {
            date = matchDate[0];
            break; 
        }
    }
    const names = lines.filter(isName);
    names.length = names.length-2;

    // remove duplicados
    const uniqueNames = [...new Set(names)];

    // remove estudante
    const filtered = uniqueNames.filter(n => n !== estudante);

    // pega os dois últimos
    const filiacao1 = filtered.at(-1) || "";
    const filiacao2 = filtered.at(-2) || "";

    const result = {
        estudante: normalizeName(estudante),
        filiacao1: normalizeName(filiacao1),
        filiacao2: normalizeName(filiacao2),
        nascimento: date
    };

    return result;
}

function extrairDadosNorm(text) {

    let primeiroNome = null;
    let date = null;

    for (const line of text) {
        const matchDate = line.match(
                /(?:Data de Nascimento|Data|Nascimento)\s*:\s*([\dIiSsOo]{1,2}\/[\dIiSsOo]{1,2}\/[\dIiSsOo]{4})/i
            );
        if (matchDate) {
            date = matchDate[1]
                .replace(/[iI]/g, "1")
                .replace(/[oO]/g, "0")
                .replace(/[sS]/g, "5");

            const [d, m, y] = date.split('/');
            date = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
        }
    }

    const nomes = text
        .map(line => line.match(/(?:Nome|N0me|d0me|dome)\s*:\s*([A-ZÀ-Ü\s-]+)/i))
        .filter(Boolean)
        .map(match => match[1]);
        
    nomes.splice(-1, 1);


    const estudante = nomes[0];

    // remove estudante
    const filtered = nomes.filter(n => n !== estudante);

    // pega os dois últimos
    const filiacao1 = filtered.at(-1) || "";
    const filiacao2 = filtered.at(-2) || "";


    const result = {
        estudante: normalizeName(estudante),
        filiacao1: normalizeName(filiacao1),
        filiacao2: normalizeName(filiacao2),
        nascimento: date
    };

    return result;
}

function carteirinha(textBoxInput) {
    if(textBoxInput == "" || textBoxInput == null){
        return "";
    }
    const text = corrigirNome(textBoxInput);

    const rawLines = text
        .split("\n")
        .filter(Boolean);

    const isRenovacao =
        /RENOV|NO: 2026|NO: 2026|MUNICIPAL|RENOVA|RENOVAG|RENOVAÇÃO|NO:/i.test(text);

    console.log("isRenovacao: ", isRenovacao);

    let data;

    if (isRenovacao) {
        data = extrairDadosRenv(rawLines);
    } else {
        data = extrairDadosNorm(rawLines);
    }

    const clean = (str) => {
        if (!str) return "";

        const normalized = str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // remove acento
            .toLowerCase();

        if (/sem\s+[o0]bserva[cg][o0]es|nao\s+consta/.test(normalized)) {
            return "";
        }

        return str.trim();
    };
    
    return [
        clean(data?.estudante),
        clean(data?.filiacao2),
        clean(data?.filiacao1),
        clean(data?.nascimento)
    ].join("\n");
}

function textInverter(textBoxInput){
    outputText = "";
    userText = textBoxInput;
    for(const c of userText){
        outputText = c + outputText;
    }   
    return outputText;
}

function toFirstLetter(text) {
    return text
        .toLowerCase()
        .split(' ')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
}

function corrigirNome(text) {
    const correcoes = {
        'JOAO': 'JOÃO',
        'JOÄO': 'JOÃO',
        'CONCEICAO': 'CONCEIÇÃO',
        'CONCEICÃO': 'CONCEIÇÃO',
        'CONCEICÄO': 'CONCEIÇÃO',
        'CONCEIÇÄO': 'CONCEIÇÃO',
        'CONCEIÇAO': 'CONCEIÇÃO',
        'GONCALVES': 'GONÇALVES',
        'PAIXAO': 'PAIXÃO',
        'BRANDAO': 'BRANDÃO',
        'JOSE': 'JOSÉ',
        'UMA': 'LIMA',
        'ALMIRANOA': 'ALMIRANDA',
        'SCARES': 'SOARES',
        'SA': 'SÁ'
    };

    const resultado = text
        .toUpperCase()
        .replace(/0/g, 'O')
        .replace(/OOS/g, 'DOS')
        .replace(/A0/g, 'AO')
        .replace(/I0/g, 'IO')
        .replace(/N0ME|D0ME/g, 'NOME')
        .replace(/AO\b/g, 'ÃO')
        .replace(/CAO\b/g, 'ÇÃO')
        .replace(/OO/g, 'Do')
        .replace(/OA/g, 'Da')
        .replace(/OAS/g, 'Das')
        .replace(/\b[A-ZÀ-Ü]+\b/g, (palavra) => correcoes[palavra] || palavra);

    console.log(resultado);
    return resultado;
}

// melhora nomes tipo "MORAES / MORAE-S"
function normalizeName(name) {
    console.log("name.replace - ",name.replace(/-/g, " "))
    return toFirstLetter(
        name.replace(/-/g, " ")
    );
}

function cleanLine(line) {
    return (line || "")
        .replace(/\s+/g, " ")
        .trim();
}

function isDate(line) {
    return /\d{2}\/\d{2}\/\d{4}/.test(line);
}

function isCPF(line) {
    return /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(line);
}

function isName(line) {
    return (
        line &&
        !isDate(line) &&
        !isCPF(line) &&
        !/\b(CEP|RUA|NO|MATRICULADO|OBSERV|MASCULINO|FEMININO|PARDA)\b/i.test(line)
    );
}