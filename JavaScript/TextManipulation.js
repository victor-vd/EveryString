//const TEXT_BOX_INPUT = document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("textBoxOutput");
//const SUBMIT_BUTTON = document.getElementById("submitButton");const TEXT_BOX_INPUT = document.getElementById("textBoxInput");

let userText = "";
let outputText = "";
    
function updateTextInput(textBoxInput) {
    TEXT_BOX_OUTPUT.value = "";
    outputText = "";
    userText = textBoxInput;
    for(const c of userText){
        outputText = c + outputText;
    }
    TEXT_BOX_OUTPUT.value = outputText;
}

function buttonSubmitClick() {
    
}


document.getElementById("toLowerCase").onchange = function(){
 if(this.checked == true){
    this.checked = false;
 } else {
    this.checked = true;
 }
};
document.getElementById("toUpperCase").onchange = function(){
    
};
document.getElementById("toFirstLetter").onchange = function(){
    
};
document.getElementById("toParagraph").onchange = function(){
    
};