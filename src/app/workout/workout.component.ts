import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faArrowCircleRight,
  faStopwatch,
  faHourglassHalf,
  faTrashAlt,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { WorkoutDB } from '../models/workout.interface';
import { LocalDBService } from '../services/localDB/local-db.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  // Icons
  public faArrow = faArrowCircleRight;
  public faWatch = faStopwatch;
  public homeIcon = faHome;
  public faHourGlass = faHourglassHalf;
  public faTrash = faTrashAlt;

  public workout: WorkoutDB;

  constructor(private route: ActivatedRoute, private localdb: LocalDBService, private router: Router) {}

  public ngOnInit(): void {
    this.workout = this.localdb.getWorkout(this.route.snapshot.params.id);
  }

  public deleteWorkout() {
    if (this.localdb.deleteWorkout(this.workout.id)) {
      this.router.navigateByUrl('workouts');
    } else {
      // TODO ERROR popup
      console.error('Impossible to delete the workout');
    }
  }
}
