import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public submitted = false;
    public loginForm: FormGroup;
    
    constructor(public fb: FormBuilder, protected appSer: AppService, protected router: Router) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, CustomValidators.email]]
        });
    }

    login(credentials, isValid) {
        this.submitted = true;
        if (!isValid) {
            return;
        }

        this.appSer.login(credentials).subscribe(data => {
            if( data.status !== 200 ){
                alert(data.message);
            } else {
                localStorage.setItem('secret_token', data.token);
                this.router.navigate(['']);
            }
        }, err => {
            alert(err.message);
        });
    }
}
