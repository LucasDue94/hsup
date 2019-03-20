import { Item } from "../item/item";
import { Solicitacao } from "../solicitacao/solicitacao";
import { Fabricante } from "../fabricante/fabricante";
import { Fornecedor } from "../fornecedor/fornecedor";

export class SolicitacaoItem {
    solicitacao: Solicitacao;
    item: Item;
    unidadeMedida: string;
    quantidade: number;
    fabricante: Fabricante[] = [];
    fornecedor: Fornecedor[] = [];

    constructor (object?: any) {
        this.fabricante = [];
        this.fornecedor = [];

        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}
