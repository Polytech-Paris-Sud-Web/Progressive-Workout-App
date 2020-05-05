import { Component, OnInit } from '@angular/core';
import { Routine } from '../models/routine.interface';
import { LocalDBService } from '../services/localDB/local-db.service';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss'],
})
export class ListRoutineComponent implements OnInit {
  public routines: Routine[];
  public allRoutines: Routine[];

  constructor(private localdb: LocalDBService) {
    this.allRoutines = this.localdb.getAllWorkouts();
  }

  /**
   * @description Update the routines list.
   */
  updateRoutines(value: string): void {
    this.routines = this.allRoutines.filter((w) => w.name.toLowerCase().match(value.toLowerCase()));
  }

  /**
   * @description Module initialisation.
   */
  ngOnInit(): void {
    this.updateRoutines('');
  }
}
