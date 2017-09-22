import { Component, OnInit } from '@angular/core';
import { Question } from '../../question';
import { QuestionService} from '../../question.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
    questions: Question[] = [];
    currentUser: User = new User;

    constructor(
        private _questionService: QuestionService,
        private _userService: UserService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.getQuestions();

        this.getCurrentUser();
    }

    getQuestions() {
      this._questionService.index(questions => this.questions = questions);
  }

  logout(){
      this._userService.logout((res) => {
          console.log(res);
          this._router.navigateByUrl('/');
      });
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

}
