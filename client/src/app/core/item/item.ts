import { Fabricante } from '../fabricante/fabricante';
import { Fornecedor } from "../fornecedor/fornecedor";

export class Item {
    id: number;

    descricao: string;
    unidadeMedida: string;
    fornecedor: Fornecedor;
    fabricante: Fabricante;

    constructor (object?: any) {
        if (object) {

            if (object.hasOwnProperty('fornecedor')) {
                this.fornecedor = object['fornecedor'].map((obj: any) => { return new Fornecedor(obj); });
                delete object['fornecedor'];
            }

            if (object.hasOwnProperty('fabricante')) {
                this.fabricante = object['fabricante'].map((obj: any) => { return new Fabricante(obj); });
                delete object['fabricante'];
            }

            for (var prop in object) {
                this[prop] = object[prop];
            }
        }

    }

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.Item : ' + (this.id ? this.id : '(unsaved)');
    }
}
