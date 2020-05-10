import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { ListWorkoutComponent } from './list-workout/list-workout.component';
import { WorkoutComponent } from './workout/workout.component';
import { RunWorkoutComponent } from './run-workout/run-workout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'create-workout', component: CreateWorkoutComponent },
  { path: 'workout/:id', component: WorkoutComponent },
  { path: 'workout/:id/run', component: RunWorkoutComponent },
  { path: 'workouts', component: ListWorkoutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
