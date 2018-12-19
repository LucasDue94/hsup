import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


    import {ProdutoRoutingModule} from './produto-routing.module';
    import {ProdutoShowComponent} from './produto-show.component';
    import {ProdutoListComponent} from './produto-list.component';
    import {ProdutoPersistComponent} from './produto-persist.component';
    
@NgModule({
    declarations: [
    ProdutoListComponent,
        ProdutoPersistComponent,
        ProdutoShowComponent
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
    
    ProdutoRoutingModule
]
})
export class ProdutoModule {}