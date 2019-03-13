import { Item } from "../item/item";
import { Solicitacao } from "../solicitacao/solicitacao";

export class SolicitacaoItem {
    solicitacao: Solicitacao;
    item: Item;
    unidadeMedida: string;
    quantidade: number;

    constructor (object?: any) {
        if (object) {
            for (const prop of Object.keys(object)) {
                this[prop] = object[prop];
            }
        }
    }
}
