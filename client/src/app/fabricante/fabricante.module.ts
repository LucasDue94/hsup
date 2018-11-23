import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FabricanteRoutingModule } from './fabricante-routing.module';
import { FabricanteListComponent } from './fabricante-list.component';
import { FabricantePersistComponent } from './fabricante-persist.component';
import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, TableModule } from "hcal";
import { TooltipModule } from "ng2-tooltip-directive";
import { NgxPaginationModule } from "ngx-pagination";
import { FabricanteShowComponent } from "./fabricante-show.component";

@NgModule({
    declarations: [
        FabricanteListComponent,
        FabricantePersistComponent,
        FabricanteShowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HcalSharedModule,
        ModalModule,
        InputBaseModule,
        NgxPaginationModule,
        TooltipModule,
        TableModule,
        FabricanteRoutingModule,
        CoreModule
    ]
})
export class FabricanteModule {}