import { ObjectId } from "mongodb";

export interface Cliente {
    _id?: ObjectId;
    nome: string;
    email: string;
    telefone: string;
    coordenadas: {
        x: number;
        y: number;
    };
}