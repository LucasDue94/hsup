import { Fabricante } from '../fabricante/fabricante';
import { Fornecedor } from "../fornecedor/fornecedor";
import {UnidadeMedida} from "../unidademedida/unidademedida";

export class Item {
    id: number;
    descricao: string;
    unidadeMedida: UnidadeMedida;
    fornecedor: Fornecedor[];
    fabricante: Fabricante[];
    ativo: boolean;

    constructor (object?: any) {
        if (this.ativo == null) this.ativo = false;
        this.fornecedor = [];
        this.fabricante = [];
        this.unidadeMedida = new UnidadeMedida();

        if (object) {

            if (object.hasOwnProperty('fornecedor')) {
                this.fornecedor = object['fornecedor'].map((obj: any) => { return new Fornecedor(obj); });
                delete object['fornecedor'];
            }

            if (object.hasOwnProperty('fabricante')) {
                this.fabricante = object['fabricante'].map((obj: any) => { return new Fabricante(obj); });
                delete object['fabricante'];
            }


           if(object.hasOwnProperty('unidadeMedida')) {
                this.unidadeMedida = object['unidadeMedida'].map((obj: any) => { return new UnidadeMedida(obj); });
                delete object['unidadeMedida'];
           }


            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Item : ' + (this.id ? this.id : '(unsaved)');
    }
}
