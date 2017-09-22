import { Component, OnInit } from '@angular/core';
import { Question } from '../../question';
import { QuestionService } from '../../question.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-new',
  templateUrl: './question-new.component.html',
  styleUrls: ['./question-new.component.css']
})
export class QuestionNewComponent implements OnInit {
  newQuestion: Question = new Question();
  errors: string[] = [];

  constructor(
      private _questionService: QuestionService,
      private _userService: UserService,
      private _router: Router
  ) { }

  ngOnInit() {
  }

  createQuestion(){
      this.errors = [];
      this._questionService.create(
          this.newQuestion,
          data => {
              if(data.errors){
                  for (const key of Object.keys(data.errors)) {
                      const error = data.errors[key];
                      this.errors.push(error.message);
                  }
              }
              else {
                  console.log(this.newQuestion);
                  this.newQuestion = new Question();
                  this._router.navigateByUrl('/browse');
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

}
