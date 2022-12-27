import documentsCollection from './dbconnect.js';

async function getDocuments() {
    const documents = await documentsCollection.find().toArray();

    return documents;
}

async function addDocument(documentName) {
    const result = await documentsCollection.insertOne({
        name: documentName,
        text: ''
    });

    return result;
}

async function findDocument(documentName) {
    const document = await documentsCollection.findOne({
        name: documentName,
    });

    return document;
}

async function updateDocument(documentName, textValue) {
    const update = await documentsCollection.updateOne(
        {
            name: documentName,
        }, 
        {
            $set: {
                text: textValue,
            }
        }
    );

    return update;
}

async function deleteDocument(documentName) {
    const result = await documentsCollection.deleteOne({
        name: documentName,
    });

    return result;
}

export { findDocument, updateDocument, getDocuments, addDocument, deleteDocument };