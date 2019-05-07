import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../core/item/item';
import { ItemService } from '../core/item/item.service';
import { FornecedorService } from '../core/fornecedor/fornecedor.service';
import { Fornecedor } from '../core/fornecedor/fornecedor';
import { FabricanteService } from '../core/fabricante/fabricante.service';
import { Fabricante } from '../core/fabricante/fabricante';

@Component({
    selector: 'item-persist',
    templateUrl: './item-persist.component.html'
})
export class ItemPersistComponent implements OnInit {

    item = new Item();
    create = true;
    errors: any[];
    aFornecedores = [];
    aFabricantes = [];
    message;

    constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router, private fornecedorService: FornecedorService, private fabricanteService: FabricanteService) {
    }

    ngOnInit() {
        this.fornecedorList();
        this.fabricanteList();

        this.route.params.subscribe((params: Params) => {
            if (params.hasOwnProperty('id')) {
                this.itemService.get(+params['id']).subscribe((item: Item) => {
                    this.create = false;
                    this.item = item;
                });
            }
        });
    }

    fornecedorList () {
        this.fornecedorService.list('', '').subscribe((fornecedorList: Fornecedor[]) => {
            fornecedorList.forEach(f => {
                this.aFornecedores.push(f)
            });
        });

        return this.aFornecedores;
    }

    fabricanteList () {
        this.fabricanteService.list('', '').subscribe((fabricanteList: Fabricante[]) => {
            fabricanteList.forEach(f => {
                this.aFabricantes.push(f)
            });
        });

        return this.aFabricantes;
    }

    save() {
        this.itemService.save(this.item).subscribe((item: any) => {
            if (this.item.id != null) {
                this.message = `Item ${this.item.descricao} alterado com sucesso!`;
            } else {
                this.message = `Item ${this.item.descricao} cadastrado com sucesso!`;
            }

            let r = this.router;
            setTimeout( function () {
                r.navigate(['/item', 'show', item.id]);
            }, 3000);
        }, (res) => {
            const json = res.error;
            if (json.hasOwnProperty('message')) {
                this.errors = [json];
            } else {
                this.errors = json._embedded.errors;
            }
        });
    }
}
