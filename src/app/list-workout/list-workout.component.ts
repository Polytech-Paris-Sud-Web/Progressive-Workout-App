import { Component, OnInit } from '@angular/core';
import { Workout } from '../models/workout.interface';
import { LocalDBService } from '../services/localDB/local-db.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-workout',
  templateUrl: './list-workout.component.html',
  styleUrls: ['./list-workout.component.scss'],
})
export class ListWorkoutComponent implements OnInit {
  public displayWorkouts: Workout[];
  public allWorkouts: Workout[];
  public homeIcon = faHome;

  constructor(private localdb: LocalDBService) {
    this.allWorkouts = this.localdb.getAllWorkouts();
  }

  /**
   * @description Update the workouts display list.
   */
  public filterWorkouts(value: string): void {
    this.displayWorkouts = this.allWorkouts.filter((w) => w.name.toLowerCase().match(value.toLowerCase()));
  }

  /**
   * @description Module initialisation.
   */
  public ngOnInit(): void {
    this.filterWorkouts('');
  }
}
