import { Component, OnInit } from '@angular/core';
import { faListAlt, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { LocalDBService } from '../services/localDB/local-db.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  iconList = faListAlt;
  iconAdd = faPlusSquare;
  iconClear = faTrashAlt;

  constructor(private localdb: LocalDBService) {}

  ngOnInit(): void {}

  clearCache(): void {
    Swal.fire({
      title: '<span style="color:#4ecca3">Delete all workouts ?</span>',
      html:
        '<span style="color:#eeeeee">You gonna reset all the local data of the application.' +
        'Is it okay for you ?</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete all !',
      cancelButtonText: 'Naaah... Bad idea.',
      background: '#393e46',
      confirmButtonColor: '#4ecca3',
      cancelButtonColor: '#FF8C00',
    }).then((result) => {
      if (result.value) {
        this.localdb.deleteAllWorkouts();
        Swal.fire('Added!', 'Your workout has been added. Please consult your list !', 'success');
      }
    });
  }
}
