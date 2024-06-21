import { Component, Input } from '@angular/core';

import { CompassComponent } from '../compass/compass.component';

@Component({
  selector: 'app-wind',
  standalone: true,
  imports: [
    CompassComponent
  ],
  templateUrl: './wind.component.html',
  styleUrl: './wind.component.css'
})
export class WindComponent {
  @Input() wind_speed!: number;
  @Input() wind_direction!: number;

  get_wind_direction(degrees: number): string {
    // Ensure degrees are within the range of 0 to 360
    degrees = (degrees + 360) % 360;

    // Define compass directions and their sectors
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(degrees / 45);

    return directions[index];
}
}
