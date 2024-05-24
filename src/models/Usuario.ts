import Curso from "./Curso";

export default interface Usuario{
    id: number;
    nome: string;
    foto: string;
    usuario: string;
    senha: string;
    curso?: Curso | null;
}