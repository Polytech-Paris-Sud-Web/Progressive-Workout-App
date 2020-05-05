import { Component } from '@angular/core';
import { PwaService } from './services/pwa/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private pwaService: PwaService) {}
  title = 'ProgressiveWorkoutApp';
}
