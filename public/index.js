import { emitAddDocument } from './socket-index.js';

const documentsList = document.getElementById('lista-documentos');
const form = document.getElementById('form-adiciona-documento');
const inputForm = document.getElementById('input-documento');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    emitAddDocument(inputForm.value);
    inputForm.value = '';
});

function insertDocumentLink(documentName) {
    documentsList.innerHTML += `
    <a 
        href="documento.html?nome=${documentName}" class="list-group-item list-group-item-action"
        id="document-${documentName}"
    >
        ${documentName}
    </a>
    `
};

function removeDocumentLink(documentName) {
    const documentId = document.getElementById(`document-${documentName}`)

    documentsList.removeChild(documentId);
};

export { insertDocumentLink, removeDocumentLink};