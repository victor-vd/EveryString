//const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("textBoxOutput");
//const SUBMIT_BUTTON = document.getElementById("submitButton");const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
let userText = "";
let outputText = "";
let toLowerCase = false;
let toUpperCase = false;
let toFirstLetter = false;
let toParagraph = false;

function buttonSubmitClick(){
    console.log(Check.toLowerCase, Check.toUpperCase, Check.toFirstLetter, Check.toParagraph)
}

const updateTextInput = {
    getInvertedText: function(textBoxInput){
        TEXT_BOX_OUTPUT.value = "";
        TEXT_BOX_OUTPUT.value = textInverter(textBoxInput);
    },
    getCaptalizedText: function(textBoxInput){
        TEXT_BOX_OUTPUT.value = textCaptilizer(textBoxInput);
    }
}

const Check = {
    toLowerCase: false,
    toUpperCase: false,
    toFirstLetter: false,
    toParagraph: false,
    checkThis: function verifyChecked(name){
        if(name == 'checkboxCaps'){
            Check.toLowerCase = document.querySelector(`input[id="toLowerCase"`).checked;
            Check.toUpperCase = document.querySelector(`input[id="toUpperCase"`).checked;
            Check.toFirstLetter = document.querySelector(`input[id="toFirstLetter"`).checked;
            Check.toParagraph = document.querySelector(`input[id="toParagraph"`).checked;
        }
    }
}

function textCaptilizer(textBoxInput = ""){
    if(Check.toLowerCase){
        textBoxInput = textBoxInput.toLowerCase();
    } else if (Check.toUpperCase) {
        textBoxInput = textBoxInput.toUpperCase();
    } else if (Check.toFirstLetter) {
        textBoxInput = function(){
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
    } else if (Check.toParagraph) {
        textBoxInput = function(){

        }
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
/*
class Check{
    constructor(name){
        this.name = name
    }
    checkboxCaps = {
        toLowerCase: value1,
        toUpperCase: value2,
        toFirstLetter: value3,
        toParagraph: value4,
    }
    setCapsValues(value1, value2, value3, value4) {
        checkboxCaps.toLowerCase = value1;
        checkboxCaps.toUpperCase = value2;
        checkboxCaps.toFirstLetter = value3;
        checkboxCaps.toParagraph = value4;
    }
    verifyChecked(name){
        if(name == 'checkboxCaps'){
            setCapsValues(
                document.querySelector(`input[id="toLowerCase"`).checked,
                document.querySelector(`input[id="toUpperCase"`).checked,
                document.querySelector(`input[id="toFirstLetter"`).checked,
                document.querySelector(`input[id="toParagraph"`).checked
            );
        }
    }
}
*/