import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FabricanteService } from './fabricante/fabricante.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { ItemService } from './item/item.service';
import { PerfilService } from './perfil/perfil.service';
import { UsuarioService } from './usuario/usuario.service';

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
    PerfilService,
    UsuarioService
]
})
export class CoreModule {}