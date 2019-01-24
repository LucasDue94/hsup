import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, StepModule, TableModule, TabModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';

import { SolicitacaoComponent } from './solicitacao.component';
import { NgxMaskModule } from "ngx-mask";
import { SolicitacaoRoutingModule } from "./solicitacao-routing.module";
import { SolicitacaoCreateComponent } from "./solicitacao-create.component";

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
    declarations: [
        SolicitacaoComponent,
        SolicitacaoCreateComponent
    ],
    imports: [
        CommonModule,
        StepModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        PerfectScrollbarModule,
        NgxMaskModule.forRoot(),
        HcalSharedModule,
        InputBaseModule,
        InfiniteScrollModule,
        NgxPaginationModule,
        TooltipModule,
        TableModule,
        TabModule,
        StepModule,
        CoreModule,
        SolicitacaoRoutingModule
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class SolicitacaoModule {}