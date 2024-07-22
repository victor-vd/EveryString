const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("textBoxOutput");
//const SUBMIT_BUTTON = document.getElementById("submitButton");const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
let userText = "";
let outputText = "";

function buttonSubmitClick(){
    console.log(Check.getToLowerCase, Check.getToUpperCase, Check.getToFirstLetter)
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
    getToLowerCase: false,
    getToUpperCase: false,
    getToFirstLetter: false,
    checkThis: function verifyChecked(name){
        if(name == 'checkboxCaps'){
            Check.getToLowerCase = document.querySelector(`input[id="getToLowerCase"`).checked;
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

function textInverter(textBoxInput){
    outputText = "";
    userText = textBoxInput;
    for(const c of userText){
        outputText = c + outputText;
    }   
    return outputText;
}