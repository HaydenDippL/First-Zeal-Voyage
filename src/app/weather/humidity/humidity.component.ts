import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.css'
})
export class HumidityComponent {
  @Input() humidity!: number;
}
