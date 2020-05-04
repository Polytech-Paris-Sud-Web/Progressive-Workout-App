import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-routine',
  templateUrl: './list-routine.component.html',
  styleUrls: ['./list-routine.component.scss']
})
export class ListRoutineComponent implements OnInit {

  _routines ;//: Routine[];
  _all_routines; //: Routine[];

  searchForm : FormGroup;

  constructor(private fb : FormBuilder) {
      this.searchForm = this.fb.group({
        search : ["",Validators.required]
      });
   }

   /**
    * @description Module initialisation.
    */
  ngOnInit(): void {
    this.updateRoutines();
    this.formOnChanges();
  }


  /**
   * @description Update the routines list.
   * @TODO
   */
  updateRoutines(): void {
    this._all_routines = [
      { 'id': 1, 'titre': "Routine...." },
      { 'id': 2, 'titre': "Matin tranquille." },
      { 'id': 3, 'titre': "Séance du soir..." },
      { 'id': 4, 'titre': "Test Police" }
    ];
    this._routines = this._all_routines;

  }

  /**
   * @description Update the displayed routine with a custom search
   */
  formOnChanges() : void{
   
    this.searchForm.get("search").valueChanges.subscribe(
      val => {
        //Empty value
        if(val == undefined || val == "")
          this._routines = this._all_routines;
        //Search from val
        else{
          this._routines = this._all_routines.filter(
            //filter
            (customRoutine) => customRoutine.titre.toLowerCase().match(val.toLowerCase())
          )
        }
      });
  }

}
