export class Setor {
    id: number;
    nome: string;
    autorizacao: boolean;

    constructor(object?: any) {
        if (this.autorizacao == null) this.autorizacao = true;
        if (object) {
            for (let prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Setor : ' + (this.id ? this.id : '(unsaved)');
    }
}
