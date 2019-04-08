import { Usuario } from "../usuario/usuario";
import { SolicitacaoItem } from "../solicitacaoItem/solicitacao-item";
import { StatusSolicitacao } from "../statusSolicitacao/status-solicitacao";

export class Solicitacao {
    id: number;
    itens: SolicitacaoItem[];
    responsavel: Usuario;
    dateCreated: any;
    urgente: boolean;
    status: StatusSolicitacao;

    constructor (object?: any) {
        if (this.urgente == null) this.urgente = false;

        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Solicitacao : ' + (this.id ? this.id : '(unsaved)');
    }
}
