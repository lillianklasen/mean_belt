import { Injectable } from '@angular/core';
import { Question } from './question';
import { Http } from '@angular/http';


@Injectable()
export class QuestionService {

  constructor(private _http: Http) { }


  index(callback) {
    this._http.get('/questions').subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }


  create(newQuestion: Question, callback) {
    this._http.post('/questions', newQuestion).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }


  show(id: string, callback) {
    this._http.get(`questions/${id}`).subscribe(
      res => callback(res.json()),
      err => console.log(err)
    );
  }
}
