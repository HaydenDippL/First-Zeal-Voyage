import { Component, inject } from '@angular/core';
import { DateTime } from 'luxon'
import { Subscription } from 'rxjs';
import { WeatherService } from '../../weather.service';
@Component({
  selector: 'app-city-header',
  standalone: true,
  imports: [],
  templateUrl: './city-header.component.html',
  styleUrl: './city-header.component.css'
})
export class CityHeaderComponent {
  temperature!: number;
  city_state!: string;
  city_query: string = "";
  weather_service = inject(WeatherService);
  private temperature_subscription!: Subscription;
  private city_subscription!: Subscription;

  // FIXME: fix the time
  // FIXME: search bar

  ngOnInit() {
    this.temperature_subscription = this.weather_service.get_temperature().subscribe(temp => this.temperature = temp);
    this.city_subscription = this.weather_service.get_city_state().subscribe(city_state => this.city_state = city_state);
  }

  ngOnDestroy() {
    if (this.temperature_subscription) this.temperature_subscription.unsubscribe();
    if (this.city_subscription) this.city_subscription.unsubscribe();
  }
}
