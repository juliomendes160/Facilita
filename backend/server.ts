import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import clienteRoutes from './src/cliente/routes/clienteRoutes';

const server = express();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors());

server.use(clienteRoutes);

server.get('*', (req, res) => {
    res.send(`Servidor está rodando na porta ${PORT}`);
});