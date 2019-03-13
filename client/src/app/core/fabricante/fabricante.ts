export class Fabricante {
    id: number;

    fantasia: string;
    ativo: boolean;

    constructor (object?: any) {
        if (this.ativo == null) this.ativo = true;

        if (object) {

            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.fabricante : ' + (this.id ? this.id : '(unsaved)');
    }
}