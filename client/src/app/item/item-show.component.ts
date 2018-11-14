import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../core/item/item';
import { ItemService } from '../core/item/item.service';
import { FornecedorService } from "../core/fornecedor/fornecedor.service";
import { FabricanteService } from "../core/fabricante/fabricante.service";
import { Fornecedor } from "../core/fornecedor/fornecedor";
import { Fabricante } from "../core/fabricante/fabricante";

@Component({
    selector: 'item-persist',
    templateUrl: './item-show.component.html'
})
export class ItemShowComponent implements OnInit {

    item = new Item();
    message: string;
    aFornecedores = [];
    aFabricantes = [];

    constructor(private route: ActivatedRoute, private itemService: ItemService, private fabricanteService: FabricanteService, private fornecedorService: FornecedorService, private router: Router) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.itemService.get(+params['id']).subscribe((item: Item) => {
                this.item = item;
                this.item.fornecedor.forEach(
                    f => {
                        this.getFornecedor(f.id);
                    });

                this.item.fabricante.forEach(
                    f => {
                        this.getFabricante(f.id);
                    });
            });
        });
    }

    getFornecedor (id: number) {
        this.fornecedorService.get(id).subscribe((fornecedor: Fornecedor) => {
            this.aFornecedores.push(fornecedor);
        });

        return this.aFornecedores;
    }

    getFabricante (id: number) {
        this.fabricanteService.get(id).subscribe((fabricante: Fabricante) => {
            this.aFabricantes.push(fabricante);
        });

        return this.aFornecedores;
    }

    destroy() {
        if (confirm(`Deseja excluir o registro: ${this.item.id}`)) {
            this.itemService.destroy(this.item).subscribe((success: boolean) => {
                if (success) {
                    this.message = `Item ${this.item.id} excluído com sucesso!`;
                    this.router.navigate(['/item','list']);
                } else {
                    alert("Erro ao excluir");
                }
            });
        }
    }
}
