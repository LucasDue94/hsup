import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


    import {SetorRoutingModule} from './setor-routing.module';
    import {SetorShowComponent} from './setor-show.component';
    import {SetorListComponent} from './setor-list.component';
    import {SetorPersistComponent} from './setor-persist.component';
    
@NgModule({
    declarations: [
    SetorListComponent,
        SetorPersistComponent,
        SetorShowComponent
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
    
    SetorRoutingModule
]
})
export class SetorModule {}