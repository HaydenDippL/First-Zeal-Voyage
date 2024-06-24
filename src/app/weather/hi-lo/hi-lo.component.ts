import { Component, inject } from '@angular/core';
import { WeatherService, Day } from '../../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hi-lo',
  standalone: true,
  imports: [],
  templateUrl: './hi-lo.component.html',
  styleUrl: './hi-lo.component.css'
})
export class HiLoComponent {
  hi_today!: number;
  lo_today!: number;
  hi_yesterday!: number;
  lo_yesterday!: number;
  weather_service = inject(WeatherService);
  private hi_today_subscription!: Subscription;
  private lo_today_subscription!: Subscription;
  private hi_yesterday_subscription!: Subscription;
  private lo_yesterday_subscription!: Subscription;

  ngOnInit() {
    this.hi_today_subscription = this.weather_service.get_temperature_high(Day.TODAY).subscribe(hi => this.hi_today = hi);
    this.lo_today_subscription = this.weather_service.get_temperature_low(Day.TODAY).subscribe(lo => this.lo_today = lo);
    this.hi_yesterday_subscription = this.weather_service.get_temperature_high(Day.YESTERDAY).subscribe(hi => this.hi_yesterday = hi);
    this.lo_yesterday_subscription = this.weather_service.get_temperature_low(Day.YESTERDAY).subscribe(lo => this.lo_yesterday = lo);
  }

  ngOnDestroy() {
    if (this.hi_today_subscription) this.hi_today_subscription.unsubscribe();
    if (this.lo_today_subscription) this.lo_today_subscription.unsubscribe();
    if (this.lo_yesterday_subscription) this.lo_yesterday_subscription.unsubscribe();
    if (this.hi_yesterday_subscription) this.hi_yesterday_subscription.unsubscribe();
  }

  get_hi_change_message(): string {
    return `The high ${this.hi_today > this.hi_yesterday ? 'increased' : 'decreased'} ${Math.abs(this.hi_today - this.hi_yesterday).toFixed(0)}°`;
  }

  get_lo_change_message(): string {
    return `The low ${this.lo_today > this.lo_yesterday ? 'increased' : 'decreased'} ${Math.abs(this.lo_today - this.lo_yesterday).toFixed(0)}°`;
  }
}
