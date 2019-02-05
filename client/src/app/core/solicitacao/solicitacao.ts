import { Usuario } from "../usuario/usuario";
import { Setor } from "../setor/setor";


export class Solicitacao {
    id: number;
    itens: Solicitacao[];
    responsavel: Usuario;
    setor: Setor;
    data: any;


    constructor (object?: any) {
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
