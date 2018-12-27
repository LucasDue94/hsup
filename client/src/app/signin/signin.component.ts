import { Component, OnInit } from '@angular/core';
import { AuthService } from "./auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    form: FormGroup;
    message;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        if (this.form.valid) {
            this.authService.authentication(this.form.value).subscribe(resp => {
                    if (resp.hasOwnProperty('access_token')) sessionStorage.setItem('token', resp['access_token']);
                    this.router.navigate(['/']);
                },
                err => {
                    this.message = 'Usuário e/ou senha inválido(s).';
                });
        } else {
            this.message = "É necessário preencher os campos usuário e senha para entrar no sistema.";
        }
    }

    logout() {
        this.authService.logout();
    }
}
