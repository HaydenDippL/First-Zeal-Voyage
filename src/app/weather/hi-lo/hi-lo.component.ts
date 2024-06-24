import { Component, inject } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hi-lo',
  standalone: true,
  imports: [],
  templateUrl: './hi-lo.component.html',
  styleUrl: './hi-lo.component.css'
})
export class HiLoComponent {
  hi!: number;
  lo!: number
  weather_service = inject(WeatherService);
  private hi_subscription!: Subscription;
  private lo_subscription!: Subscription;

  ngOnInit() {
    this.hi_subscription = this.weather_service.get_temperature_high().subscribe(hi => this.hi = hi);
    this.lo_subscription = this.weather_service.get_temperature_low().subscribe(lo => this.lo = lo);
  }

  ngOnDestroy() {
    if (this.hi_subscription) this.hi_subscription.unsubscribe();
    if (this.lo_subscription) this.lo_subscription.unsubscribe();
  }
}
