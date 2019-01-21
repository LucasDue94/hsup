import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


    import {PermissoesRoutingModule} from './permissoes-routing.module';
    import {PermissoesShowComponent} from './permissoes-show.component';
    import {PermissoesListComponent} from './permissoes-list.component';
    import {PermissoesPersistComponent} from './permissoes-persist.component';
    
@NgModule({
    declarations: [
    PermissoesListComponent,
        PermissoesPersistComponent,
        PermissoesShowComponent
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
    PermissoesRoutingModule
]
})
export class PermissoesModule {}