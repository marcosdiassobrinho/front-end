import {Fabricante} from "./fabricante.model";

export class Plataforma {
    id!: number;
    nome!: string;
    descricao!: string;
    imagePath!: string;
    anoLancamento!: string;
    fabricante!: Fabricante;
}