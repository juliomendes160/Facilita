export interface Cliente {
    nome: string;
    email: string;
    telefone: string;
    coordenadas: {
        x: number;
        y: number;
    };
}