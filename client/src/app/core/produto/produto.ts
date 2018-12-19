export class Produto {
    id: number;
    quantidade: number;
    descricao: string;
    setor: string;

    constructor (object?: any) {
        if (object) {
            for (var prop in object) {
                this[prop] = object[prop];
            }
        }
    }
}
