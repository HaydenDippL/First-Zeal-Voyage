import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TipsCalculatorComponent } from './tips-calculator/tips-calculator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TipsCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zeal-First-Voyage';
}
