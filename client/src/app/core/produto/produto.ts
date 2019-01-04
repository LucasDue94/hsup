export class Produto {
    id: number;
    estoque: number;
    descricao: string;
    setor: string;
    bloqueado: string;

    constructor (object?: any) {
        if (object) {
            for (var prop in object) {
                this[prop] = object[prop];
            }
        }
    }
}
