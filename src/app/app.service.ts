import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService implements CanActivate {
    private API_URL: String;

    constructor(private http: Http, public authHTTP: AuthHttp, private router: Router) {
        this.API_URL = environment.API_URL;
    }

    canActivate() {
        if (this.check()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

    check() {
        const token = localStorage.getItem('secret_token');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    userDetail() {
        return this.authHTTP.get(this.API_URL + 'case_study/companies/58cba141ba169e0eab2657c9/company_case_studies/595c859eba169ec47e4f20d4/user_company_case_studies/595ce021ba169edb9c733e90?include[company_case_study][include]=questions')
            .map(res => res.json())
            .catch(err => Observable.throw(err) || 'Server Error');
    }
}
