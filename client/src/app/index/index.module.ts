import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from "./index.component";
import { TooltipModule } from "ng2-tooltip-directive";
import { AlmoxarifeModule } from "../almoxarife/almoxarife.module";

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        AlmoxarifeModule
    ],
    declarations: [
        IndexComponent
    ]
})
export class IndexModule { }
