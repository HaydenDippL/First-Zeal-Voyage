import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

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
  precipitation_chances: number[] = [0, 0, 14, 99, 0, 0, 30];
  humidity_predictions: number[] = [98, 98, 95, 99, 56, 34, 56];
  days!: string[];
  
  ngOnInit() {
    const now: DateTime = DateTime.now();
    this.days = Array.from({ length: 7 }, (_, i) => now.plus({days: i}).toFormat("ccc"));
  }
}
