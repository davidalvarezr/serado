import { Component } from '@angular/core';
import {HttpFactory} from '../models/httpFactory/HttpFactory';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient) {
    console.log('Inside, home.page.ts constructor');
    this.http.get('https://www.google.ch').subscribe(
        response => {
          console.log(response);
        }
    );
  }

}
