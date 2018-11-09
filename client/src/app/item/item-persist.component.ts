import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Item} from '../core/item/item';
import {ItemService} from '../core/item/item.service';
import {Response} from "@angular/http";
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
  fornecedorList: Fornecedor[];
  fabricanteList: Fabricante[];

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router, private fornecedorService: FornecedorService, private fabricanteService: FabricanteService) {}

  ngOnInit() {
    this.fornecedorService.list().subscribe((fornecedorList: Fornecedor[]) => { this.fornecedorList = fornecedorList; });
    this.fabricanteService.list().subscribe((fabricanteList: Fabricante[]) => { this.fabricanteList = fabricanteList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.itemService.get(+params['id']).subscribe((item: Item) => {
          this.create = false;
          this.item = item;
        });
      }
      
      if (params.hasOwnProperty('fornecedorId')) {
        this.item.fornecedor = new Fornecedor({id: params['fornecedorId']})
      }

      
      if (params.hasOwnProperty('fabricanteId')) {
        this.item.fabricante = new Fabricante({id: params['fabricanteId']})
      }

    });
  }

  save() {
    this.itemService.save(this.item).subscribe((item: Item) => {
      this.router.navigate(['/item', 'show', item.id]);
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
