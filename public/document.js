import socketFunctions from "./socket-document.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get('nome');

const textEditor = document.getElementById('editor-texto');
const documentTitle = document.getElementById('titulo-documento');
const deleteButton = document.getElementById('excluir-documento');

documentTitle.textContent = documentName || 'Documento sem título';

socketFunctions.selectDocument(documentName);

textEditor.addEventListener('keyup', () => {
    socketFunctions.socketEmitText({
        text: textEditor.value, 
        documentName
    });
});

function updateTextEditor(text) {
    textEditor.value = text;
};

deleteButton.addEventListener('click', () => {
    socketFunctions.emitDeleteEvent(documentName);
});

function alertAndRedirect(documentNameParam) {
    if (documentName == documentNameParam) {
        alert(`${documentName} excluido!`);
        window.location.href = '/';
    }
};

export { updateTextEditor, alertAndRedirect };