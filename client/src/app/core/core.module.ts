import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FabricanteService } from './fabricante/fabricante.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { ItemService } from './item/item.service';
import { ProdutoService } from './produto/produto.service';
import { UnidadeMedidaService } from './unidadeMedida/unidadeMedida.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    FabricanteService,
    FornecedorService,
    ItemService,
    ProdutoService,
    UnidadeMedidaService
]
})
export class CoreModule {}