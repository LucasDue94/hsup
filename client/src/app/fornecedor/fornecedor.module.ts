import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


    import {FornecedorRoutingModule} from './fornecedor-routing.module';
    import {FornecedorShowComponent} from './fornecedor-show.component';
    import {FornecedorListComponent} from './fornecedor-list.component';
    import {FornecedorPersistComponent} from './fornecedor-persist.component';
    
@NgModule({
    declarations: [
    FornecedorListComponent,
        FornecedorPersistComponent,
        FornecedorShowComponent
    ],
imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HcalSharedModule,
    InputBaseModule,
    NgxPaginationModule,
    TooltipModule,
    TableModule,
    CoreModule,
    
    FornecedorRoutingModule
]
})
export class FornecedorModule {}