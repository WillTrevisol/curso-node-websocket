import chalk from 'chalk';
import io from './server.js';
import { findDocument, updateDocument, getDocuments, addDocument, deleteDocument } from './dbDocuments.js';

io.on('connection', (socket) => {

    socket.on('getDocuments', async (returnDocuments) => {
        const documents = await getDocuments();
        
        returnDocuments(documents);
    });

    socket.on('add_document', async (documentName) => {
        const exist = (await findDocument(documentName)) !== null;

        if (exist) {
            return socket.emit('document_exists', documentName);
        }

        const result = await addDocument(documentName);
        
        if (result.acknowledged) {
            io.emit('add_document_on_interface', documentName);
        }
    });

    socket.on('select_document', async (value, callback) => {
        socket.join(value);
        const document = await findDocument(value);

        if (document) {
            callback(document.text);
        }
    });

    socket.on('text_editor', async ({text, documentName}) => {
        const update = await updateDocument(documentName, text);

        if (update.modifiedCount) {
            socket.to(documentName).emit('text_to_clients', text);
        }
    });

    socket.on('delete_document', async (documentName) => {
        const result = await deleteDocument(documentName);

        if (result.deletedCount) {
            io.emit('delete_document_success', documentName);
        }
    });
});