import { NextFunction, Request, Response } from 'express';
import * as clienteDao from '../daos/clienteDao';
import { ObjectId } from 'mongodb';
import { Cliente } from '../models/cliente';

export const Salvar = async (req: Request, res: Response) => {

    if(!req.body.nome || !req.body.email ||  !req.body.telefone || !req.body.coordenadasx || !req.body.coordenadasy){
        res.status(400).json('Operação salvar: campos obrigatórios!');
        return;
    }

    const cliente: Cliente = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        coordenadas: {
            x: req.body.coordenadasx,
            y: req.body.coordenadasy
        }
    };

    try {
        await clienteDao.Salvar(cliente);
        res.status(200).json("Sucesso ao salvar cliente!");
    } catch (error) {
        console.error('Erro ao salvar cliente:', error);
        res.status(500).send('Erro ao salvar cliente!');
    }
}

export const Listar = async (req: Request, res: Response) => {

    if (req.query.q === undefined){
        req.query.q = '';
    }

    const query = {
        $or: [
            { nome: { $regex: req.query.q, $options: 'i' } },
            { telefone: { $regex: req.query.q, $options: 'i' } },
            { email: { $regex: req.query.q, $options: 'i' } },
            { coordenadas: {
                x: { $regex: req.query.q, $options: 'i' },
                y: { $regex: req.query.q, $options: 'i' }
            } }
        ]
    }    

    try {
        const clientes = await clienteDao.Listar(query);
        if(req.route.stack[0].name!=="Listar"){
            return clientes
        }

        if(clientes.length){
            res.status(200).json(clientes);
        }
        else{
            res.status(200).json("Sucesso ao listar: não existe cliente cadastrado!");
        }
       
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).send('Erro ao listar clientes!');
    }
}

export const Consultar = async (req: Request, res: Response) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Operação consultar: id obrigatório!');
        return;
    }

    const objectId = new ObjectId(req.params.id);

    try {
        const cliente = await clienteDao.Consultar(objectId);
        if(cliente){
            res.status(200).json(cliente);
        }
        else{
            res.status(200).json("Sucesso ao consultar: não existe cliente cadastrado!");
        }
        
    } catch (error) {
        console.error('Erro ao consultar cliente:', error);
        res.status(500).send('Erro ao consultar cliente!');
    }
}

export const Atualizar = async(req: Request, res: Response) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Operação atualizar: id obrigatório!');
        return;
    }

    if(!req.body.nome || !req.body.email ||  !req.body.telefone || !req.body.coordenadasx || !req.body.coordenadasy){
        res.status(400).json('Operação salvar: campos obrigatórios!');
        return;
    }

    const objectId = new ObjectId(req.params.id);
    
    const cliente: Cliente = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        coordenadas: {
            x: req.body.coordenadasx,
            y: req.body.coordenadasy
        }
    };

    try {
        await clienteDao.Atualizar(objectId, cliente);
        res.status(200).json("Sucesso ao atualizar cliente!");
    } catch (error) {
        console.error('Erro ao atulizar cliente:', error);
        res.status(500).send('Erro ao atulizar cliente!');
    }
}

export const Excluir = async (req: Request, res: Response) => {
    
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Operação excluir: id obrigatório!');
        return;
    }

    const objectId = new ObjectId(req.params.id);

    try {
        await clienteDao.Excluir(objectId);
        res.json("Sucesso ao excluir cliente!");
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        res.status(500).send('Erro ao excluir cliente!');
    }
}

export const Rotas = async (req: Request, res: Response) => {
    
    try{
        const empresa = { coordenadas: { x: 0, y: 0 } };
        const rota = [];
        const clientes = await Listar(req, res);
    
        while (clientes!.length > 0) {
            let distancia;
            let distanciaMenor = Infinity;
            let clienteMaisProximo;
            let clienteMaisProximoIndex;
    
            clientes!.forEach((cliente, index) => {
                distancia = Math.sqrt((empresa.coordenadas.x - cliente.coordenadas.x) ** 2 + (empresa.coordenadas.y - cliente.coordenadas.y) ** 2);
                if (distancia < distanciaMenor) {
                    distanciaMenor = distancia;
                    clienteMaisProximo = cliente;
                    clienteMaisProximoIndex = index;
                }
            });
    
            rota.push(clienteMaisProximo);
            empresa.coordenadas = clienteMaisProximo!.coordenadas;
            clientes!.splice(clienteMaisProximoIndex!, 1);
        }
    
        if(rota.length > 0){
            res.status(200).json(rota);
        }
        else{
            res.status(200).json("Sucesso ao calcular rotas: não existe cliente cadastrado!");
        }
    }
    catch(error){
        console.error('Erro ao calcular rotas:', error);
        res.status(500).send('Erro ao calcular rotas!');
    }
}