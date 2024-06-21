import { Component } from '@angular/core';
import { CityHeaderComponent } from './city-header/city-header.component';
import { HumidityComponent } from './humidity/humidity.component';
import { WindComponent } from './wind/wind.component';
import { HiLoComponent } from './hi-lo/hi-lo.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { UvIndexComponent } from './uv-index/uv-index.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';

import { WeatherService, WeatherObject } from '../weather.service';
import { Subscription } from 'rxjs';
import exp from 'constants';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CityHeaderComponent,
    HumidityComponent,
    WindComponent,
    HiLoComponent,
    TemperatureChartComponent,
    UvIndexComponent,
    PrecipitationComponent
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  weatherData: WeatherObject | null = null;
  city: string = "Dallas"

  constructor(private weatherService: WeatherService) {
    weatherService.search_city(this.city);
  }

  ngOnInit(): void {
    this.weatherService.getWeatherUpdates().subscribe({
      next: data => this.weatherData = data,
      error: error => console.error('Error fetching weather data', error)
    });
  }

  get_wind_speed() {
    if (this.weatherData) return this.weatherData.current.wind_speed_10m;
    else return 0;
  }

  get_wind_direction() {
    if (this.weatherData) return this.weatherData.current.wind_direction_10m;
    else return 0;
  }

  get_temperature() {
    if (this.weatherData) return Math.round(this.weatherData.current.temperature_2m);
    else return 0;
  }

  get_humidity() {
    if (this.weatherData) return this.weatherData.current.relative_humidity_2m;
    else return 0;
  }

  get_uv_index() {
    if (this.weatherData) return Number(this.weatherData.daily.uv_index_max[0].toFixed(1));
    else return -1;
  }

  get_temperature_high() {
    if (this.weatherData) return Math.round(this.weatherData.daily.temperature_2m_max[0]);
    else return -1;
  }

  get_temperature_low() {
    if (this.weatherData) return Math.round(this.weatherData.daily.temperature_2m_min[0]);
    else return -1;
  }

  get_temperature_forecast(): number[] {
    const expected_legnth = 7;
    const hi_weight = 0.75;
    const lo_weight = 1 - hi_weight;

    const max_rand_temp = 78;
    const min_rand_temp = max_rand_temp - 20;
    if (this.weatherData) {
      return Array.from({ length: this.weatherData.daily.temperature_2m_max.length }, (_, i) => {
        return this.weatherData!.daily.temperature_2m_max[i] * hi_weight +
          this.weatherData!.daily.temperature_2m_min[i] * lo_weight;
      })
    } else {
      return Array.from({ length: expected_legnth }, (_, i) => {
        return Math.floor(Math.random() * (max_rand_temp - min_rand_temp + 1)) + min_rand_temp;
      })
    }
  }
}
