import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        if (this.form.valid) this.authService.authentication(this.form.value);
    }

}
