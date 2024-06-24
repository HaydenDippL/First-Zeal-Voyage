import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService, Day } from '../../weather.service';

@Component({
  selector: 'app-uv-index',
  standalone: true,
  imports: [],
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.css'
})
export class UvIndexComponent {
  uv_today!: number;
  uv_yesterday!: number;
  weather_service = inject(WeatherService);
  private uv_today_subscription!: Subscription;
  private uv_yesterday_subscription!: Subscription;

  ngOnInit() {
    this.uv_today_subscription = this.weather_service.get_uv_index(Day.TODAY).subscribe(uv_today => this.uv_today = uv_today);
    this.uv_yesterday_subscription = this.weather_service.get_uv_index(Day.YESTERDAY).subscribe(uv_yesterday => this.uv_yesterday = uv_yesterday);
  }

  ngOnDestroy() {
    if (this.uv_today_subscription) this.uv_today_subscription.unsubscribe();
    if (this.uv_yesterday_subscription) this.uv_yesterday_subscription.unsubscribe();
  }

  get_uv_message(): string {
    return `${this.uv_today > this.uv_yesterday ? '↑' : '↓'}${Math.abs((this.uv_today - this.uv_yesterday)).toFixed(1)} vs yesterday`;
  }
}
