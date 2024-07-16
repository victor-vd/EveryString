const TEXT_BOX_INPUT = document.getElementsByClassName("textBoxInput")[0];
const TEXT_BOX_OUTPUT = document.getElementsByClassName("textBoxOutput")[0];
const SUBMIT_BUTTON = document.getElementById("buttonSubmit");
let userText = "";
let outputText = "";

TEXT_BOX_INPUT.addEventListener('input', updateTextInput);
    
function updateTextInput() {
    TEXT_BOX_OUTPUT.textContent = "";
    outputText = "";
    userText = TEXT_BOX_INPUT.value;
    for(const c of userText){
        outputText = c + outputText;
    }
    TEXT_BOX_OUTPUT.textContent = outputText;
}

SUBMIT_BUTTON.onclick = function() {
    
}