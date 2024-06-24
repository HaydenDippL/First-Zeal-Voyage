import { Component, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import Chroma from 'chroma-js';
import { DateTime } from 'luxon';
import { WeatherService } from '../../weather.service';
import { Subscription } from 'rxjs';

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
  temperatures!: number[];
  temperature_chart_data!: any;
  temperature_chart_options!: any;
  weather_service = inject(WeatherService);
  private temperatures_subscription!: Subscription;

  ngOnInit() {
    this.temperatures_subscription = this.weather_service.get_temperature_forecast().subscribe(temperatures => {
      this.temperatures = temperatures;
      this.update_chart();
    })
  }
  
  update_chart() {
    const colors = this.temperatures.map(temp => this.temperature_color_scale(temp));
    const now: DateTime = DateTime.now();

    this.temperature_chart_data = {
      labels: Array.from({ length: 7 }, (_, i) => now.plus({days: i}).toFormat("ccc")),
      datasets: [
        {
          data: this.temperatures,
          backgroundColor: colors
        }
      ]
    };

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
          min: Math.min(...this.temperatures) - 5,
          max: Math.max(...this.temperatures) + 3,
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

  temperature_color_scale(temp: number): string {
    const red: string = 'rgb(202, 2, 2)';
    const yellow: string = 'rgb(237, 174, 28)';
    const white: string = 'rgb(228, 254, 255)';
    const blue: string = 'rgb(81, 243, 249)';
    const deep_blue: string = 'rgb(17, 97, 100)';

    const red_start: number = 100;
    const yellow_start: number = 72;
    const white_start: number = 46;
    const blue_start: number = 0;
    const deep_blue_start: number = -20;

    if (temp >= red_start) return red;
    else if (temp >= yellow_start) return Chroma.scale([yellow, red]).mode('lch').domain([yellow_start, red_start])(temp).hex();
    else if (temp >= white_start) return Chroma.scale([white, yellow]).mode('lch').domain([white_start, yellow_start])(temp).hex();
    else if (temp >= blue_start) return Chroma.scale([blue, white]).mode('lch').domain([blue_start, white_start])(temp).hex();
    else if (temp >= deep_blue_start) return Chroma.scale([deep_blue, blue]).mode('lch').domain([deep_blue_start, blue_start])(temp).hex();
    else return deep_blue;
  }
}