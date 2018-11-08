import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {FornecedorRoutingModule} from './fornecedor-routing.module';
import {FornecedorShowComponent} from './fornecedor-show.component';
import {FornecedorListComponent} from './fornecedor-list.component';
import {FornecedorPersistComponent} from './fornecedor-persist.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    FornecedorListComponent,
    FornecedorPersistComponent,
    FornecedorShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FornecedorRoutingModule,
    CoreModule
]
})
export class FornecedorModule {}