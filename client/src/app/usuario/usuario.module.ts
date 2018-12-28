import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';


import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioShowComponent } from './usuario-show.component';
import { UsuarioListComponent } from './usuario-list.component';
import { UsuarioPersistComponent } from './usuario-persist.component';

@NgModule({
    declarations: [
        UsuarioListComponent,
        UsuarioPersistComponent,
        UsuarioShowComponent
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
        UsuarioRoutingModule
    ]
})
export class UsuarioModule {
}