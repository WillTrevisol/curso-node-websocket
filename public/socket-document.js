import { updateTextEditor, alertAndRedirect } from "./document.js";

const socket = io();

function selectDocument(name) {
    socket.emit('select_document', name, (text) => {
        console.log(text);
        updateTextEditor(text);
    });

};

function socketEmitText(data) {
    socket.emit('text_editor', data);
};

socket.on('text_to_clients', (value) => {
    updateTextEditor(value);
});

function emitDeleteEvent(documentName) {
    socket.emit('delete_document', documentName);
};

socket.on('delete_document_success', (documentName) => {
    alertAndRedirect(documentName);
});

export default { socketEmitText, selectDocument, emitDeleteEvent };