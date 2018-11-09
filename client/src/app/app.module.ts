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
    CustomDualListModule,
    HcalSharedModule,
    InputBaseModule,
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
    HcalSharedModule,
    IndexModule,
    AsideBarModule,
    MainModule,
    NotificationDropdownModule,
    TableModule,
    InputBaseModule,
    SelectBaseModule,
    CustomDualListModule,
    FormsModule,
    FabricanteModule,
    AppRoutingModule,
    NgbModule.forRoot()
],
    providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}, NavService, FabricanteService],
    bootstrap: [AppComponent]
})
export class AppModule {}

