import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon'

@Component({
  selector: 'app-city-header',
  standalone: true,
  imports: [],
  templateUrl: './city-header.component.html',
  styleUrl: './city-header.component.css'
})
export class CityHeaderComponent {
  @Input() city!: string;
  @Input() temperature!: number;

  // time: string = this.get_current_time(); // Initialize time with current time
  // private intervalId?: any; // Variable to hold the interval ID

  // ngOnInit() {
  //   // Update time every 5 seconds
  //   this.intervalId = setInterval(() => {
  //     this.time = this.get_current_time();
  //   }, 5000); // 5000 milliseconds = 5 seconds
  // }

  // ngOnDestroy() {
  //   // Clear the interval when the component is destroyed to prevent memory leaks
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }

  private get_current_time(): string {
    return DateTime.now().toLocaleString(DateTime.TIME_SIMPLE);
  }
}
