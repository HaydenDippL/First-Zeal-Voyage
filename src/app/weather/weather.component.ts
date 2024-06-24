import { Component } from '@angular/core';
import { CityHeaderComponent } from './city-header/city-header.component';
import { HumidityComponent } from './humidity/humidity.component';
import { WindComponent } from './wind/wind.component';
import { HiLoComponent } from './hi-lo/hi-lo.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { UvIndexComponent } from './uv-index/uv-index.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';
import { WeatherService } from '../weather.service';

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
  city: string = "Dallas"

  constructor(private weatherService: WeatherService) {
    weatherService.search_city(this.city);
  }
}
