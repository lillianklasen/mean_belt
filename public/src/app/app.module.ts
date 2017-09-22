import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { QuestionListComponent } from './dashboard/question-list/question-list.component';
import { QuestionNewComponent } from './dashboard/question-new/question-new.component';

import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { AnswerService } from './answer.service';

import { QuestionShowComponent } from './dashboard/question-show/question-show.component';

import { AnswerNewComponent } from './dashboard/answer-new/answer-new.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    QuestionListComponent,
    QuestionNewComponent,
    QuestionShowComponent,
    AnswerNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, QuestionService, AnswerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
