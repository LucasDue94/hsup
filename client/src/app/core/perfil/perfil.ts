import { Permissoes } from "../permissoes/permissoes";


export class Perfil {
    id: number;
    name: string;
    permissoes: Permissoes[] = [];

    constructor(object?: any) {
        if (object) {
            if (object.hasOwnProperty('permissoes')) {
                this.permissoes = object['permissoes'].map((obj: any) => { return new Permissoes(obj); });
                delete object['permissoes'];
            }

            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Perfil : ' + (this.id ? this.id : '(unsaved)');
    }
}
