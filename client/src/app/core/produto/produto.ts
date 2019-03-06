export class Produto {
    id: number;
    estoque: number;
    descricao: string;

    constructor (object?: any) {
        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}