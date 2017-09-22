import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: User = new User();
  errors: string[] = [];


  constructor(
      private _userService: UserService,
      private _router: Router
  ) { }

  ngOnInit() {
  }

  createUser(){
      this.errors = [];
      this._userService.createUser(this.newUser, (res) => {
          if(res.errors) {
              for (const key of Object.keys(res.errors)){
                  const error = res.errors[key];
                  this.errors.push(error.message);
              }
          }
          else{
              console.log('success');
              this._router.navigateByUrl('/browse');
          }
      })
    }
}
