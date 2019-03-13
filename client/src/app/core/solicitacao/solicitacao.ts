import { Usuario } from "../usuario/usuario";
import { Status } from "tslint/lib/runner";

export class Solicitacao {
    id: number;
    itens: Solicitacao[];
    responsavel: Usuario;
    data: any;
    urgente: boolean;
    status: Status;

    constructor (object?: any) {
        if (this.urgente == null) this.urgente = false;

        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.SolicitacaoItem : ' + (this.id ? this.id : '(unsaved)');
    }
}
