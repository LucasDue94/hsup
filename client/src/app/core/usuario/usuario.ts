import { Perfil } from '../perfil/perfil';
import { Permissoes } from '../permissoes/permissoes';
import { Setor } from "../setor/setor";

export class Usuario {
    id: number;
    password: string;
    username: string;
    name: string;
    setor: Setor;
    perfil: Perfil;
    authorities: Permissoes[];
    passwordExpired: boolean;
    accountLocked: boolean;
    accountExpired: boolean;
    enabled: boolean;

    constructor(object?: any) {
        if (object) {

            if (object.hasOwnProperty('perfil')) {
                this.perfil = new Perfil(object['perfil']);
                delete object['perfil'];
            }

            if (object.hasOwnProperty('authorities')) {
                this.authorities = object['authorities'].map((obj: any) => {
                    return new Permissoes(obj);
                });
                delete object['authorities'];
            }

            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Usuario : ' + (this.id ? this.id : '(unsaved)');
    }
}
