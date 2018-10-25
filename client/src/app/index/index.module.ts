import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from "./index.component";
import { TooltipModule } from "ng2-tooltip-directive";

@NgModule({
    imports: [
        CommonModule,
        TooltipModule
    ],
    declarations: [
        IndexComponent
    ]
})
export class IndexModule { }
