import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FabricanteService } from './fabricante/fabricante.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { ItemService } from './item/item.service';
import { SetorService } from './setor/setor.service';
import { PerfilService } from './perfil/perfil.service';

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
    SetorService,
    PerfilService
]
})
export class CoreModule {}