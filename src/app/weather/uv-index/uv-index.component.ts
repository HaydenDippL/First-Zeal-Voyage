import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../weather.service';

@Component({
  selector: 'app-uv-index',
  standalone: true,
  imports: [],
  templateUrl: './uv-index.component.html',
  styleUrl: './uv-index.component.css'
})
export class UvIndexComponent {
  uv!: number;
  weather_service = inject(WeatherService);
  private uv_subscription!: Subscription;

  ngOnInit() {
    this.uv_subscription = this.weather_service.get_uv_index().subscribe(uv => this.uv = uv);
  }

  ngOnDestroy() {
    if (this.uv_subscription) this.uv_subscription.unsubscribe();
  }
}
