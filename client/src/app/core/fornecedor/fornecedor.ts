export class Fornecedor {
    id: any;
    fantasia: string;
    ativo: boolean;
    telefone: string;
    endereco: string;
    email: string;

    constructor (object?: any) {
        if (this.ativo == null) this.ativo = true;

        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Fornecedor : ' + (this.id ? this.id : '(unsaved)');
    }
}
