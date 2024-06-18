//import { Component } from '@angular/core';

// @Component({
//   selector: 'app-weather',
//   standalone: true,
//   imports: [],
//   templateUrl: './weather.component.html',
//   styleUrl: './weather.component.css'
// })
// export class WeatherComponent {

// }
// Declare function to fetch weather data
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
  }[];
  sys: {
    sunrise: number;
  };
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  apiKey = '92928b8e37b84d9658c4ba6b1c94ee41';
  city: string = '';
  temperature: number | null = null;
  temperatureHigh: number | null = null;
  temperatureLow: number | null = null;
  feelsLike: number | null = null;
  outsideHumidity: number | null = null;
  rainCondition: string = '';
  sunriseTime: string = '';
  currentTime: string = '';
  clockTime: string = '';

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 60000); // Update every minute
    setInterval(() => this.showTime(), 1000); // Update every second
  }

  async getWeather() {
    if (!this.city) {
      alert('Please enter a city');
      return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;

    console.log('Fetching current weather data for', this.city);
    try {
      const response = await fetch(currentWeatherUrl);
      const data: WeatherData = await response.json();
      console.log('Current weather data received:', data);
      this.currentWeather(data);
    } catch (error) {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    }
  }

  currentWeather(data: WeatherData) {
    console.log("function Data", data);
    this.temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32);
    this.temperatureHigh = Math.round((data.main.temp_max - 273.15) * 9/5 + 32);
    this.temperatureLow = Math.round((data.main.temp_min - 273.15) * 9/5 + 32);
    this.feelsLike = Math.round((data.main.feels_like - 273.15) * 9/5 + 32);
    this.outsideHumidity = data.main.humidity;
    this.rainCondition = data.weather[0].main;
    this.sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  }

  showTime() {
    this.currentTime = new Date().toUTCString();
  }

  updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes: number | string = now.getMinutes();

    // Pad single digit minutes with a leading zero
    minutes = minutes < 10 ? '0' + minutes : minutes;

    this.clockTime = hours + ':' + minutes;
  }
}
