import { Component, inject } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-humidity',
  standalone: true,
  imports: [],
  templateUrl: './humidity.component.html',
  styleUrl: './humidity.component.css'
})
export class HumidityComponent {
  humidity!: number;
  weather_service = inject(WeatherService);
  private humidity_subscription!: Subscription;

  ngOnInit() {
    this.humidity_subscription = this.weather_service.get_humidity().subscribe(humidity => this.humidity = humidity);
  }

  ngOnDestroy() {
    if (this.humidity_subscription) this.humidity_subscription.unsubscribe();
  }
}
