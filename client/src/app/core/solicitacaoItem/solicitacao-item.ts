import { Item } from "../item/item";


export class SolicitacaoItem {
    id: number;
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

    toString(): string {
        return 'br.com.hospitaldocoracaoal.hsup.SolicitacaoItem : ' + (this.id ? this.id : '(unsaved)');
    }
}
