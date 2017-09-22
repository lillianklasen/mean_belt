import { Component, OnInit } from '@angular/core';
import { Question } from '../../question';
import { Answer } from '../../answer';
import { User } from '../../user';
import { QuestionService } from '../../question.service';
import { UserService } from '../../user.service';
import { AnswerService } from '../../answer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {

  subscription: Subscription;
  question: Question = new Question;
  answer: Answer = new Answer;
  currentUser: User = new User;
  answers: Answer[] = [];

  constructor(
      private _questionService: QuestionService,
      private _userService: UserService,
      private _answerService: AnswerService,
      private _route: ActivatedRoute,
      private _router: Router
  ) { }

  ngOnInit() {
      this.getQuestion();
      this.getCurrentUser();
      this.getAnswers();
  }

  getQuestion() {
    this.subscription = this._route.params.subscribe(
      params => this._questionService.show(params.id, res => this.question = res)
    );
  }

  getAnswers() {
    this._answerService.index(answers => this.answers = answers);
}

  increaseLikes(): void {
     this.answer.likes++;
   }

   getCurrentUser() {
     this._userService.session((res) => {
         if(res.status == false) {
             this._router.navigateByUrl('/');
         } else {
             this.currentUser = res;
         }
     })
 }

 logout(){
     this._userService.logout((res) => {
         this._router.navigateByUrl('/');
     }
 );
}

}
