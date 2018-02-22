import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userdata: any = [];

  constructor(protected appSer: AppService) { }

  ngOnInit() {
    this.appSer.userDetail().subscribe(data => {
      // this.userdata = data.result;
      console.log(data);
    }, err => {
        alert(err.message);
    });
  }

}
