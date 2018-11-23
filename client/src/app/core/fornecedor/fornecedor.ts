

export class Fornecedor {
    id: number;

    fantasia: string;
    ativo: boolean;
    telefone: string;
    endereco: string;
    email: string;

    constructor (object?: any) {
        if (this.ativo == null) this.ativo = true;

        if (object) {

            for (var prop in object) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Fornecedor : ' + (this.id ? this.id : '(unsaved)');
    }
}
