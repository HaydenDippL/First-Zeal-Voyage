import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './temperature-chart.component.html',
  styleUrl: './temperature-chart.component.css'
})
export class TemperatureChartComponent {
  temperature_chart_data!: any;
  temperature_chart_options!: any;
  
  ngOnInit() {
    this.temperature_chart_data = {
      labels: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: [77, 82, 93, 96, 95, 98, 90],
          backgroundColor: ['black', 'black', 'black', 'black', 'black', 'black', 'black']
        }
      ]
    };

    const data = [77, 82, 93, 96, 95, 98, 90]

    this.temperature_chart_options = {
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'black'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0)',
            drawBorder: false,
          }
        },
        y: {
          min: Math.min(...data) - 5,
          max: Math.max(...data) + 3,
          ticks: {
            stepSize: 5,
            callback: function(value: number) {
              return value % 5 === 0 ? value : '';
            },
            color: 'black'
          },
          grid: {
            color: 'black',
            drawBorder: false,
            lineWidth: function(context: any) {
              const value = context.tick.value;
              return value % 5 === 0 ? 1 : 0; // Only draw lines at multiples of 5
            }
          }
        }
      }
    };
  }
}
