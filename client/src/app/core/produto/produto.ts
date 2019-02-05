export class Produto {
    id: number;
    estoque: number;
    descricao: string;
    setor: string;
    codigo: string;
    bloqueado: string;

    constructor (object?: any) {
        if (object) {
            for (let prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}
