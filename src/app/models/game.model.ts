import { Developer } from "./developer.model";
import { Genero } from "./genero.model";
import { Plataforma } from "./plataforma.model";

export class Game {
    id!:number;
    nome!:string;
    descricao!:string;
    preco!:number
    estoque!:number;
    diretor!:string;
    anoLancamento!:number;
    developer!:Developer;
    generos: Genero[] = [];
    plataformas: Plataforma[] = [];
}
