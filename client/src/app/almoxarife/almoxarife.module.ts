import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HcalSharedModule, ModalModule, TableModule } from "hcal";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlmoxarifeComponent } from "./almoxarife.component";

import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

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
        TableModule,
        InfiniteScrollModule,
        ModalModule
    ],
    declarations: [
        AlmoxarifeComponent
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class AlmoxarifeModule {
}


