import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.emit('getDocuments', (documents) => {
    documents.forEach(element => {
        insertDocumentLink(element.name);
    });
});

function emitAddDocument(documentName) {
    socket.emit('add_document', documentName);
}

socket.on('add_document_on_interface', (value) => {
    insertDocumentLink(value);
});

socket.on('document_exists', (documentName) => {
    alert(`O documento ${documentName} já existe.`)
});

socket.on('delete_document_success', (documentName) => {
    removeDocumentLink(documentName);
});

export { emitAddDocument }