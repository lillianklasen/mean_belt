import { Injectable } from '@angular/core';
import { Answer } from './answer';
import { Http } from '@angular/http';

@Injectable()
export class AnswerService {

  constructor(private _http: Http) { }


  index(callback) {
    this._http.get('/answers').subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }


  create(id:string, newAnswer: Answer, callback) {
    this._http.post(`/questions/${id}/answers`, newAnswer).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }


  show(id: string, callback) {
    this._http.get(`answers/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
}
