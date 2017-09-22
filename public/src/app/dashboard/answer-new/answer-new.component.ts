import { Component, OnInit } from '@angular/core';
import { Answer } from '../../answer';
import { AnswerService } from '../../answer.service';
import { Question } from '../../question';
import { QuestionService } from '../../question.service';
import { UserService } from '../../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-answer-new',
  templateUrl: './answer-new.component.html',
  styleUrls: ['./answer-new.component.css']
})
export class AnswerNewComponent implements OnInit {

  newAnswer: Answer = new Answer();
  answerErrors: string[] = [];
  subscription: Subscription;
  question: Question = new Question;
  id = '';

  constructor(
      private _answerService: AnswerService,
      private _questionService: QuestionService,
      private _userService: UserService,
      private _router: Router,
      private _route: ActivatedRoute,
  ) { }

  ngOnInit() {
      this.getQuestion();
  }

  createAnswer(){
      this.answerErrors = [];

      this._answerService.create(
          this.id = this.question._id,
          this.newAnswer,
          data => {
              if(data.errors){
                  for (const key of Object.keys(data.errors)) {
                      const error = data.errors[key];
                      this.answerErrors.push(error.message);
                  }
              }
              else {
                  console.log(this.newAnswer);
                  this._router.navigateByUrl('/question/' + this.question._id);
                  this.newAnswer = new Answer();
              }
          }
      )
    }

    logout(){
        this._userService.logout((res) => {
            console.log(res);
            this._router.navigateByUrl('/');
        }
    );
   }

    getQuestion() {
      this.subscription = this._route.params.subscribe(
        params => this._questionService.show(params.id, res => this.question = res)
      );
    }
}
