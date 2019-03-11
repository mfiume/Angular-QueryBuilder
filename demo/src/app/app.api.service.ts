import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Field } from './model/search/field';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
    console.log("Constructor");
    console.log("Pinging " + `${this.apiURL}/fields`);
    console.log(this.getFields());
  }

  getFields() {
    return this.httpClient.get<Field[]>(`${this.apiURL}/fields`);
  }

  //this.getFields = getFields;

}
