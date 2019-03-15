import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { HcalSharedModule, InputBaseModule, ModalModule, StepModule, TableModule, WizardModule } from 'hcal';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxPaginationModule } from 'ngx-pagination';

import { SolicitacaoListComponent } from './solicitacao-list.component';
import { NgxMaskModule } from "ngx-mask";
import { SolicitacaoRoutingModule } from "./solicitacao-routing.module";
import { SolicitacaoCreateComponent } from "./solicitacao-create.component";

import {
    PERFECT_SCROLLBAR_CONFIG,
    PerfectScrollbarConfigInterface,
    PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { SolicitacaoApprovalComponent } from './solicitacao-approval.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    declarations: [
        SolicitacaoListComponent,
        SolicitacaoCreateComponent,
        SolicitacaoApprovalComponent
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
        NgxPaginationModule,
        TooltipModule,
        TableModule,
        WizardModule,
        StepModule,
        CoreModule,
        SolicitacaoRoutingModule,
        InfiniteScrollModule
    ],
    providers: [{
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }]
})
export class SolicitacaoModule {
}

