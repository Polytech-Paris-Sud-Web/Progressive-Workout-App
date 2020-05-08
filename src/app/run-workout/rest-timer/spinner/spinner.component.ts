import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnChanges {
  @Input() value = 0;

  public circumference: number = 2 * Math.PI * 47;
  public strokeDashoffset = 0;
  public color = '#0000ff';

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.onPercentageChanged(changes.value.currentValue);
    }
  }

  public onPercentageChanged(val: number) {
    const offset = this.circumference - (val / 100) * this.circumference;
    this.strokeDashoffset = offset;
  }
}
