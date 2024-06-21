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

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeatherUpdates().subscribe({
      next: data => this.weatherData = data,
      error: error => console.error('Error fetching weather data', error)
    });
  }
}
