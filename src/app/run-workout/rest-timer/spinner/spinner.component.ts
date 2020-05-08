import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnChanges {
  @Input() value = 0;
  @Input() restTime: number;

  public circumference: number = 2 * Math.PI * 47;
  public strokeDashoffset = 0;
  public color = '#F48E61';

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.onPercentageChanged((changes.value.currentValue / this.restTime) * 100);
    }
  }

  public onPercentageChanged(val: number) {
    const offset = this.circumference - (val / 100) * this.circumference;
    this.strokeDashoffset = offset;
  }
}
