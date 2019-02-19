export class Produto {
    id: number;
    estoque: number;
    descricao: string;
    codigo: string;
    bloqueado: string;

    constructor(object?: any) {
        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}
