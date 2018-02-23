import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService implements CanActivate {
    private API_URL: String;

    constructor(private http: Http, private router: Router) {
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

    userDetail(accessToken) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + accessToken);
        let opts = new RequestOptions();
        opts.headers = headers;
        return this.http.get(this.API_URL + 'case_study/companies/58cba141ba169e0eab2657c9/company_case_studies/595c859eba169ec47e4f20d4/user_company_case_studies/595ce021ba169edb9c733e90?include[company_case_study][include]=questions', opts)
            .map(res => res.json())
            .catch(err => Observable.throw(err) || 'Server Error');
    }
}
