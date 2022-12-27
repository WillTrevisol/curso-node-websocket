import express from "express";
import url from "url";
import path from "path";
import http from "http";
import {Server} from "socket.io";
import chalk from "chalk";

import "./dbconnect.js";

const app = express();

const port = process.env.porta || 3000;

const actualPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(actualPath, '../..', 'public');
app.use(express.static(publicDir));

const httpServer = http.createServer(app);

httpServer.listen(port, () => console.log(chalk.green(`Servidor escutando na porta: ${port}`)));

const io = new Server(httpServer);

export default io;