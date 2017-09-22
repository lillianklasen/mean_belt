import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './dashboard/login/login.component';
import { QuestionListComponent } from './dashboard/question-list/question-list.component';
import { QuestionNewComponent } from './dashboard/question-new/question-new.component';
import { QuestionShowComponent } from './dashboard/question-show/question-show.component';
import { AnswerNewComponent } from './dashboard/answer-new/answer-new.component';


const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children:  [
            {path: '', pathMatch: 'full', component: LoginComponent},
            {path: 'browse', pathMatch: 'full', component: QuestionListComponent},
            {path: 'new_question', pathMatch: 'full', component: QuestionNewComponent},
            {path: 'question/:id', component: QuestionShowComponent},
            {path: 'question/:id/new_answer', component: AnswerNewComponent},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
