import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkoutComponent } from './workout/workout.component';
import { ListWorkoutComponent } from './list-workout/list-workout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CreateWorkoutComponent } from './create-workout/create-workout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PwaService } from './services/pwa/pwa.service';

@NgModule({
  declarations: [AppComponent, WorkoutComponent, ListWorkoutComponent, CreateWorkoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [PwaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
