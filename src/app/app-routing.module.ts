import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutineComponent } from './routine/routine.component';
import { ListRoutineComponent } from './list-routine/list-routine.component';


const routes: Routes = [
  { path: "routine/:id", component: RoutineComponent },
  { path: "", component: ListRoutineComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
