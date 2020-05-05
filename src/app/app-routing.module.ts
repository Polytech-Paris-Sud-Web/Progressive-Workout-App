import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateRoutineComponent} from './create-routine/create-routine.component';
import {ListRoutineComponent} from './list-routine/list-routine.component';

const routes: Routes = [
  { path: 'create-routine', component: CreateRoutineComponent },
  { path: 'routines', component: ListRoutineComponent },
  { path: '**', component: ListRoutineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
