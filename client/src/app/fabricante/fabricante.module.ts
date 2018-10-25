import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FabricanteRoutingModule } from './fabricante-routing.module';
import { FabricanteListComponent } from './fabricante-list.component';
import { FabricantePersistComponent } from './fabricante-persist.component';
import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, TableModule } from "hcal";
import { TooltipModule } from "ng2-tooltip-directive";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
    declarations: [
        FabricanteListComponent,
        FabricantePersistComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HcalSharedModule,
        InputBaseModule,
        NgxPaginationModule,
        TooltipModule,
        TableModule,
        FabricanteRoutingModule,
        CoreModule
    ]
})
export class FabricanteModule {}