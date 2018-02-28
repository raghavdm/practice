import * as oauth from 'simple-oauth2'; 
import { NgxCarousel } from 'ngx-carousel';
import { Component, OnInit } from '@angular/core';
import { environment } from '../..//environments/environment';

import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private oauth2;
  public quesNo = 1;
  public userdata: any= [];
  public dataModel: any = [];
  public carouselOne: NgxCarousel;

  constructor(protected appSer: AppService, protected route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if(params.ques != undefined) {
        this.quesNo = params.ques;
        var ques = JSON.parse(localStorage.getItem('ques'));
        this.userdata = ques[this.quesNo - 1];
        this.dataModel[this.quesNo] = this.dataModel[this.quesNo] == undefined ? '' : this.dataModel[this.quesNo];
      }
    });
  }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    const credentials = {
      client: {
        id: '4874eafd0f7a240625e59b2b123a142a669923d5b0d31ae8743f6780a95187f5',
        secret: '908f6aee4d4cb27782ba55ae0c814bf43419f3220d696206212a29fe3a05cd88'
      },
      auth: {
        tokenHost: environment.API_URL
      }
    };
    this.oauth2 = oauth.create(credentials);
    const tokenConfig = {
      grant_type: 'password',
      scope: 'user',
      auth_token: 'azd4jXWWLagyb9KzgfDJ'
    };
    this.oauth2.ownerPassword.getToken(tokenConfig, (error, result) => {
      if (error) {
        return console.log('Access Token Error', error);
      }
     
      const accessToken = this.oauth2.accessToken.create(result);

      this.appSer.userDetail(accessToken.token.access_token).subscribe(data => {
        if(this.quesNo == 1) {
          this.userdata = data.user_company_case_study.company_case_study.questions[0];
        }
        localStorage.setItem('ques', JSON.stringify(data.user_company_case_study.company_case_study.questions));
      }, err => {
          alert(err.message);
      });
    });
  }

  public answer() {
    var questionId = this.userdata._id.$oid;
    var answer = this.dataModel[this.quesNo];
    console.log(questionId, answer);

    //can submit to put request
  }

}
