import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from './app.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule, routes } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import {
    AsideBarModule,
    CustomDualListboxModule,
    HcalSharedModule,
    InputBaseModule,
    LoginModule,
    MainModule,
    NotificationDropdownModule,
    SelectBaseModule,
    TableModule
} from "hcal";
import { FabricanteModule } from "./fabricante/fabricante.module";
import { NavComponent } from "./nav/nav.component";
import { IndexModule } from "./index/index.module";
import { FabricanteService } from "./core/fabricante/fabricante.service";
import { HttpModule } from "@angular/http";
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ItemModule } from './item/item.module';
import { NgxMaskModule } from "ngx-mask";
import { SigninModule } from "./signin/signin.module";
import { PerfilModule } from './perfil/perfil.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthGuard } from "./guards/auth.guard";
import { RouterModule } from "@angular/router";
import { PermissoesModule } from './permissoes/permissoes.module';

import { AlmoxarifeModule } from "./almoxarife/almoxarife.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SetorModule } from './setor/setor.module';
import { ErrorComponent } from './error/error.component';
import { SolicitacaoModule } from "./solicitacao/solicitacao.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        NgxMaskModule.forRoot(),
        HcalSharedModule,
        IndexModule,
        LoginModule,
        AsideBarModule,
        MainModule,
        SigninModule,
        NotificationDropdownModule,
        TableModule,
        InfiniteScrollModule,
        InputBaseModule,
        SelectBaseModule,
        CustomDualListboxModule,
        FormsModule,
        LoginModule,
        FabricanteModule,
        AppRoutingModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(routes),
        FornecedorModule,
        ItemModule,
        PerfilModule,
        UsuarioModule,
        PermissoesModule,
        AlmoxarifeModule,
        BrowserAnimationsModule,
        SetorModule,
        SolicitacaoModule,
        PerfectScrollbarModule
    ],
    providers: [AuthGuard, Location, {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    }, NavService, FabricanteService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

