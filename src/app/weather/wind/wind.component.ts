import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { WeatherService, Day } from '../../weather.service';
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
  wind_speed_today!: number;
  wind_speed_yesterday!: number;
  wind_gust_speed!: number;
  wind_direction!: number;
  weather_service = inject(WeatherService);
  private wind_speed_today_subscription!: Subscription;
  private wind_speed_yesterday_subscription!: Subscription;
  private wind_direction_subscription!: Subscription;
  private wind_gust_speed_subscription!: Subscription;

  ngOnInit() {
    this.wind_speed_today_subscription = this.weather_service.get_wind_speed(Day.TODAY).subscribe(wind_speed => this.wind_speed_today = wind_speed);
    this.wind_speed_yesterday_subscription = this.weather_service.get_wind_speed(Day.YESTERDAY).subscribe(wind_speed => this.wind_speed_yesterday = wind_speed);
    this.wind_direction_subscription = this.weather_service.get_wind_direction().subscribe(wind_direction => this.wind_direction = wind_direction);
    this.wind_gust_speed_subscription = this.weather_service.get_wind_gust_speed().subscribe(wind_speed => this.wind_gust_speed = wind_speed);
  }

  ngOnDestroy() {
    if (this.wind_speed_today_subscription) this.wind_speed_today_subscription.unsubscribe();
    if (this.wind_speed_yesterday_subscription) this.wind_speed_yesterday_subscription.unsubscribe();
    if (this.wind_direction_subscription) this.wind_direction_subscription.unsubscribe();
    if (this.wind_gust_speed_subscription) this.wind_gust_speed_subscription.unsubscribe();
  }

  get_wind_direction(degrees: number): string {
    // Ensure degrees are within the range of 0 to 360
    degrees = (degrees + 360) % 360;

    // Define compass directions and their sectors
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round(degrees / 45);

    return directions[index];
  }

  get_wind_change_message(): string {
    return `${this.wind_speed_today > this.wind_speed_today ? '↑' : '↓'}${Math.abs((this.wind_speed_today - this.wind_speed_yesterday)).toFixed(1)} mph vs yesterday`;
  }
}
