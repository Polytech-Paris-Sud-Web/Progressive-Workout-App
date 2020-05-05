import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CreateRoutineComponent} from './create-routine/create-routine.component';
import {ListRoutineComponent} from './list-routine/list-routine.component';
import { RoutineComponent } from './routine/routine.component';

const routes: Routes = [
  { path: 'create-routine', component: CreateRoutineComponent },
  { path: "routine/:id", component: RoutineComponent },
  { path: 'routines', component: ListRoutineComponent },
  { path: '**', component: ListRoutineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
