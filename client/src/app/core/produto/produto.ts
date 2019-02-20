export class Produto {
    id: string;
    descricao: string;
    estoque: number;

    constructor(object?: any) {
        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}
