export class StatusSolicitacao {
    id: number;
    nome: string;
    peso: number;
    statusPermitido: StatusSolicitacao[];

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
