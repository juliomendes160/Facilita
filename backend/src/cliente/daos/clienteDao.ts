import {MongoClient, ObjectId} from 'mongodb';
import { Cliente } from '../models/cliente';

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri);
const database = client.db('facilita');
const collection = database.collection('cliente');

export const Salvar = async (cliente: Cliente) => {
    try {
        client.connect();
        await collection.insertOne(cliente);
    } finally {
        await client.close();
    }
}

export const Listar = async () => {

    try {
        client.connect();
        return await collection.find().toArray();
    } finally {
        await client.close();
    }
}

export const Filtrar = async (query: object) => {

    try {
        client.connect();
        return await collection.find(query).toArray();
    } finally {
        await client.close();
    }
}

export const Consultar = async (objectId: ObjectId) => {
    try {
        client.connect();
        return await collection.findOne({ _id: objectId });
    } finally {
        await client.close();
    }
}

export const Atualizar = async (cliente: Cliente) => {
    try {
        client.connect();
        await collection.updateOne({ _id: cliente._id },{ $set: cliente});
    } finally {
        await client.close();
    }
}

export const Excluir = async (objectId: ObjectId) => {
    try {
        client.connect();
        await collection.deleteOne({ _id: objectId });
    } finally {
        await client.close();
    }
}