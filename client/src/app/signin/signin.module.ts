import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { HcalSharedModule, LoginModule } from "hcal";
import { AuthService } from "./auth.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [SigninComponent],
    imports: [
        CommonModule,
        LoginModule,
        HcalSharedModule,
        ReactiveFormsModule,
        LoginModule
    ],
    providers: [AuthService],
    exports: [SigninComponent]
})
export class SigninModule {
}
