import { Component } from '@angular/core';

import { CompassComponent } from '../compass/compass.component';

@Component({
  selector: 'app-wind',
  standalone: true,
  imports: [
    CompassComponent
  ],
  templateUrl: './wind.component.html',
  styleUrl: './wind.component.css'
})
export class WindComponent {

}
