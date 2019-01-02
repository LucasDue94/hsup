import { Perfil } from "../perfil/perfil";

export class Usuario {
    id: number;

    name: string;
    password: string;
    username: string;
    passwordExpired: boolean;
    accountLocked: boolean;
    accountExpired: boolean;
    enabled: boolean;
    perfil: Perfil[];

    constructor(object?: any) {
        if (this.enabled == null) this.enabled = true;
        this.perfil = [];

        if (object) {
            if (object.hasOwnProperty('perfil')) {
                this.perfil = object['perfil'].map((obj: any) => { return new Perfil(obj); });
                delete object['perfil'];
            }

            for (const prop in object) {
                this[prop] = object[prop];
            }
        }
    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Usuario : ' + (this.id ? this.id : '(unsaved)');
    }
}
