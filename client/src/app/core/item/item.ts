import { Fabricante } from '../fabricante/fabricante';
import { Fornecedor } from "../fornecedor/fornecedor";
import { Produto } from "../produto/produto";

export class Item {
    id: any;
    produto: Produto;
    descricao: string;
    fornecedor: Fornecedor[] = [];
    fabricante: Fabricante[] = [];
    ativo: boolean;

    constructor (object?: any) {
        if (this.ativo == null) this.ativo = true;
        this.fornecedor = [];
        this.fabricante = [];
        this.produto = new Produto();

        if (object) {
            if (object.hasOwnProperty('fornecedor')) {
                this.fornecedor = object['fornecedor'].map((obj: any) => { return new Fornecedor(obj); });
                delete object['fornecedor'];
            }

            if (object.hasOwnProperty('fabricante')) {
                this.fabricante = object['fabricante'].map((obj: any) => { return new Fabricante(obj); });
                delete object['fabricante'];
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