import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FabricanteService } from './fabricante/fabricante.service';
import { FornecedorService } from './fornecedor/fornecedor.service';
import { ItemService } from './item/item.service';
import { PerfilService } from './perfil/perfil.service';
import { UsuarioService } from './usuario/usuario.service';
import { PermissoesService } from './permissoes/permissoes.service';
import { ProdutoService } from './produto/produto.service';
import { UnidadeMedidaService } from './unidadeMedida/unidadeMedida.service';
import { SetorService } from './setor/setor.service';

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
    UsuarioService,
    PermissoesService,
    ItemService,
    ProdutoService,
    UnidadeMedidaService,
    SetorService,
]
})
export class CoreModule {}