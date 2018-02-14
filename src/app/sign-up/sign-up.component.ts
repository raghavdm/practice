import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../app.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public submitted = false;
  public signUpForm: FormGroup;
  public croppedImage: any = '';
  public imageChangedEvent: any = '';

  constructor(public fb: FormBuilder, protected appSer: AppService, protected router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      dob: ['', Validators.required],
      photo: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.email]]
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
      this.croppedImage = image;
  }

  signUp(credentials, isValid) {
    this.submitted = true;
    if (!isValid) {
        return;
    }

    this.appSer.signUp(credentials).subscribe(data => {
        if( data.status !== 200 ){
            alert(data.message);
        } else {
            localStorage.setItem('role', data.admin.role);
            localStorage.setItem('secret_token', data.admin.secretToken);
            this.router.navigate(['']);
        }
    }, err => {
        alert(err.message);
    });
  }

}
