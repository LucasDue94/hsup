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
                    if (resp.hasOwnProperty('access_token')) {
                        localStorage.setItem('token', resp['access_token']);
                        localStorage.setItem('username', resp['username']);
                        localStorage.setItem('roles', resp['roles']);
                        localStorage.setItem('name', resp['name']);
                        localStorage.setItem('id', resp['id']);
                        localStorage.setItem('setor', resp['setor']);
                    }
                    this.router.navigate(['/index']);
                },
                err => {
                    (err);
                    this.message = 'Usuário e/ou senha inválido(s).';
                });
        } else {
            this.message = "É necessário preencher os usuário e senha para entrar no sistema.";
        }
    }
}
