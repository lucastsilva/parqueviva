export interface IAssociado {
    nome: string;
    email: string;
    telefone: string;
    lotes: ILote[];
}

export interface ILote {
    conjunto: string;
    numero: string;
}