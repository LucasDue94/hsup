export class StatusSolicitacao {
    id: number;
    nome: string;

    constructor (object?: any) {
        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.StatusSolicitacaoItem : ' + (this.id ? this.id : '(unsaved)');
    }
}
