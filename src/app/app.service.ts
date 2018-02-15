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

    login(credentials) {
        return this.http.post(this.API_URL + 'user/login', credentials)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()) || 'Server Error');
    }

    signUp(credentials) {
        return this.http.post(this.API_URL + 'user/create', credentials)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()) || 'Server Error');
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

    getUsers() {
        return this.authHTTP.get(this.API_URL + 'cashier/list')
            .map(res => res.json())
            .catch(err => Observable.throw(err) || 'Server Error');
    }
}
