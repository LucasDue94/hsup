import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


    import {PerfilRoutingModule} from './perfil-routing.module';
    import {PerfilShowComponent} from './perfil-show.component';
    import {PerfilListComponent} from './perfil-list.component';
    import {PerfilPersistComponent} from './perfil-persist.component';
    
@NgModule({
    declarations: [
    PerfilListComponent,
        PerfilPersistComponent,
        PerfilShowComponent
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
    
    PerfilRoutingModule
]
})
export class PerfilModule {}