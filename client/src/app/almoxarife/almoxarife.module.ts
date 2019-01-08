import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmoxarifeComponent } from "./almoxarife.component";
import { HcalSharedModule, TableModule } from "hcal";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmoxarifeIndexComponent } from './almoxarife-index.component';
import { AlmoxarifeRoutingModule } from "./almoxarife-routing.module";

import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        HcalSharedModule,
        PerfectScrollbarModule,
        FormsModule,
        ReactiveFormsModule,
        AlmoxarifeRoutingModule,
        TableModule
    ],
    declarations: [
        AlmoxarifeComponent,
        AlmoxarifeIndexComponent
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class AlmoxarifeModule {
}
