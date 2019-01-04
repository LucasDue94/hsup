import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


import { UnidadeMedidaRoutingModule } from './unidadeMedida-routing.module';
import { UnidadeMedidaShowComponent } from './unidadeMedida-show.component';
import { UnidadeMedidaListComponent } from './unidadeMedida-list.component';
import { UnidadeMedidaPersistComponent } from './unidadeMedida-persist.component';

@NgModule({
    declarations: [
        UnidadeMedidaListComponent,
        UnidadeMedidaPersistComponent,
        UnidadeMedidaShowComponent
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
        ModalModule,
        UnidadeMedidaRoutingModule
    ]
})
export class UnidadeMedidaModule {
}