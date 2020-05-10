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
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RunWorkoutComponent } from './run-workout/run-workout.component';
import { RestTimerComponent } from './run-workout/rest-timer/rest-timer.component';
import { SpinnerComponent } from './run-workout/rest-timer/spinner/spinner.component';
import { GlobalTimerComponent } from './run-workout/global-timer/global-timer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    ListWorkoutComponent,
    CreateWorkoutComponent,
    RunWorkoutComponent,
    RestTimerComponent,
    SpinnerComponent,
    GlobalTimerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [PwaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
