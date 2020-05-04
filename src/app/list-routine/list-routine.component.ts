import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {

  _routines ;//: Routine[];
  _all_routines; //: Routine[];

  constructor() { }

   /**
    * @description Module initialisation.
    */
  ngOnInit(): void {
    this.updateRoutines("");
  }


  /**
   * @description Update the routines list.
   * @TODO
   */
  updateRoutines(value : string ): void {
    this._all_routines = [
      { 'id': 1, 'titre': "Routine...." },
      { 'id': 2, 'titre': "Matin tranquille." },
      { 'id': 3, 'titre': "Séance du soir..." },
      { 'id': 4, 'titre': "Test Police" }
    ];
    
    //Filter results
    if(value != undefined){
      this._routines = this._all_routines.filter(
        (customRoutine) => customRoutine.titre.toLowerCase().match(value.toLowerCase())
      );
    }
    //No filter required
    else 
      this._routines = this._all_routines;
  }

}
