import chalk from 'chalk';
import { MongoClient } from 'mongodb';

const connectionString = process.env.CSTRING;

const client = new MongoClient(connectionString);
let documentsCollection;


try {
    await client.connect();

    const db = client.db('CursoNode');
    documentsCollection = db.collection('curso_socket');

    console.log(chalk.greenBright('Banco conectado com sucesso.'));

} catch (error) {
    console.log(chalk.red(`${error} - Falha de conexão.`));
}


export default documentsCollection;