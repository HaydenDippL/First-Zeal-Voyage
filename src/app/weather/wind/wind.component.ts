import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService } from '../../weather.service';
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
  wind_speed!: number;
  wind_direction!: number;
  weather_service = inject(WeatherService);
  private wind_speed_subscription!: Subscription;
  private wind_direction_subscription!: Subscription;

  ngOnInit() {
    this.wind_speed_subscription = this.weather_service.get_wind_speed().subscribe(wind_speed => this.wind_speed = wind_speed);
    this.wind_direction_subscription = this.weather_service.get_wind_direction().subscribe(wind_direction => this.wind_direction = wind_direction);
  }

  ngOnDestroy() {
    if (this.wind_speed_subscription) this.wind_speed_subscription.unsubscribe();
    if (this.wind_direction_subscription) this.wind_direction_subscription.unsubscribe();
  }

  get_wind_direction(degrees: number): string {
    // Ensure degrees are within the range of 0 to 360
    degrees = (degrees + 360) % 360;

    // Define compass directions and their sectors
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(degrees / 45);

    return directions[index];
}
}
