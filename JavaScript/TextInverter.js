const TEXT_BOX_INPUT = document.getElementById("TextCaptilizer").document.getElementById("textBoxInput");
const TEXT_BOX_OUTPUT = document.getElementById("TextCaptilizer").document.getElementById("textBoxInput");
const SUBMIT_BUTTON = document.getElementById("TextCaptilizer").document.getElementById("textBoxInput");
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