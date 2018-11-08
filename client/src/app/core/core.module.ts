import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { FabricanteService } from './fabricante/fabricante.service';
import { FornecedorService } from './fornecedor/fornecedor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
  ],
providers: [
    FabricanteService,
    FornecedorService
]
})
export class CoreModule {}