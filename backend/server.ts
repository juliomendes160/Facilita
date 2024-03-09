import express from 'express';

const server = express();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

server.get('*', (req, res) => {
    res.send(`Servidor está rodando na porta ${PORT}`);
});