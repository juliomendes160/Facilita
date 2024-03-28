export interface Cliente {
    _id?: string;
    nome: string;
    telefone: number;
    email: string;
    coordenadas: {
        x: number;
        y: number;
    }
}