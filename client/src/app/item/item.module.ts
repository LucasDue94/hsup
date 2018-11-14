import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { CustomDualListModule, HcalSharedModule, InputBaseModule, TableModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';

import { ItemRoutingModule } from './item-routing.module';
import { ItemShowComponent } from './item-show.component';
import { ItemListComponent } from './item-list.component';
import { ItemPersistComponent } from './item-persist.component';
import { NgxMaskModule } from "ngx-mask";

@NgModule({
    declarations: [
        ItemListComponent,
        ItemPersistComponent,
        ItemShowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        HcalSharedModule,
        InputBaseModule,
        CustomDualListModule,
        NgxPaginationModule,
        TooltipModule,
        TableModule,
        CoreModule,
        ItemRoutingModule
    ]
})
export class ItemModule {}