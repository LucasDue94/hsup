import { Usuario } from "../usuario/usuario";

export class Setor {
    id: number;
    nome: string;
    necessitaAutorizacao: boolean;
    gestor: Usuario;

    constructor(object?: any) {
        if (this.necessitaAutorizacao == null) this.necessitaAutorizacao = false;
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
