import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TipsCalculatorComponent } from './tips-calculator/tips-calculator.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TipsCalculatorComponent,
    GroceryListComponent,
    RockPaperScissorsComponent,
    WeatherComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zeal-First-Voyage';
}
