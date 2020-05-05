import { Component, OnInit } from '@angular/core';
import {LocalDBService} from '../services/localDB/local-db.service';
import {Routine} from '../models/routine.interface';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {
  public routines: Routine[];
  public allRoutines: Routine[];

  constructor(
    private localdb: LocalDBService
  ) {
    console.log(this.localdb.getAllWorkouts());
    this.allRoutines = this.localdb.getAllWorkouts();
  }

  /**
   * @description Update the routines list.
   * @TODO
   */
  updateRoutines(value: string ): void {
    this.routines = this.allRoutines.filter(w => w.name.toLowerCase().match(value.toLowerCase()));
  }

   /**
    * @description Module initialisation.
    */
  ngOnInit(): void {
    this.updateRoutines('');
  }

}
