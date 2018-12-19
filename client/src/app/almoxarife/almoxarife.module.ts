import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmoxarifeComponent } from "./almoxarife.component";
import { HcalSharedModule } from "hcal";
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
        PerfectScrollbarModule
    ],
    declarations: [
        AlmoxarifeComponent
    ],
    exports: [
        AlmoxarifeComponent
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class AlmoxarifeModule {
}
