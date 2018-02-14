import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// import { AppService } from '../app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public submitted = false;
    public loginForm: FormGroup;
    // protected appSer: AppService, 
    constructor(public fb: FormBuilder, protected router: Router) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            password: ['', Validators.required],
            email: ['', [Validators.required, CustomValidators.email]]
        });
    }

    login(credentials, isValid) {
        this.submitted = true;
        if (!isValid) {
            return;
        }

        // this.appSer.login(credentials).subscribe(data => {
        //     if( data.status !== 200 ){
        //         alert(data.message);
        //     } else {
        //         localStorage.setItem('role', data.admin.role);
        //         localStorage.setItem('secret_token', data.admin.secretToken);
        //         this.router.navigate(['']);
        //     }
        // }, err => {
        //     alert(err.message);
        // });
    }
}
