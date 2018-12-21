import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from './app.component';
import { NavService } from './nav/nav.service';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import {
    AsideBarModule,
    CustomDualListboxModule,
    HcalSharedModule,
    InputBaseModule, LoginModule,
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

@NgModule({
    declarations: [
        AppComponent,
        NavComponent
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
    InputBaseModule,
    SelectBaseModule,
    CustomDualListboxModule,
    FormsModule,
    LoginModule,
    FabricanteModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FornecedorModule,
    ItemModule,
    PerfilModule
],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, FabricanteService],
    bootstrap: [AppComponent]
})
export class AppModule {}

