import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { WeatherService } from '../../weather.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-precipitation',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './precipitation.component.html',
  styleUrl: './precipitation.component.css'
})
export class PrecipitationComponent {
  precipitation_probabilities!: number[];
  weather_service = inject(WeatherService);
  private precipitation_probabilities_subscription!: Subscription;

  days!: string[];
  
  ngOnInit() {
    const now: DateTime = DateTime.now();
    this.days = Array.from({ length: 7 }, (_, i) => now.plus({days: i}).toFormat("ccc"));

    this.precipitation_probabilities_subscription = this.weather_service.get_precipitation_probabilities().subscribe(precipitation_probabilities => this.precipitation_probabilities = precipitation_probabilities);
  }

  ngOnDestroy() {
    if (this.precipitation_probabilities_subscription) this.precipitation_probabilities_subscription.unsubscribe();
  }
}
