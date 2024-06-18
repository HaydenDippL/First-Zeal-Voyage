import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private city!: string;
  private temp!: number;

  constructor() { }

  // search_city(city: string) {

  //   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`;

  //   console.log('Fetching current weather data for', this.city);
  //   try {
  //     const response = await fetch(currentWeatherUrl);
  //     const data: WeatherData = await response.json();
  //     console.log('Current weather data received:', data);
  //     this.currentWeather(data);
  //   } catch (error) {
  //     console.error('Error fetching current weather data:', error);
  //     alert('Error fetching current weather data. Please try again.');
  //   }
  // }
  // currentWeather(data: WeatherData) {
  //   console.log("function Data", data);
  //   this.temperature = Math.round((data.main.temp - 273.15) * 9/5 + 32);
  //   this.temperatureHigh = Math.round((data.main.temp_max - 273.15) * 9/5 + 32);
  //   this.temperatureLow = Math.round((data.main.temp_min - 273.15) * 9/5 + 32);
  //   this.feelsLike = Math.round((data.main.feels_like - 273.15) * 9/5 + 32);
  //   this.outsideHumidity = data.main.humidity;
  //   this.rainCondition = data.weather[0].main;
  //   this.sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  // }

  // showTime() {
  //   this.currentTime = new Date().toUTCString();
  // }

  // updateClock() {
  //   const now = new Date();
  //   let hours = now.getHours();
  //   let minutes: number | string = now.getMinutes();

  //   // Pad single digit minutes with a leading zero
  //   minutes = minutes < 10 ? '0' + minutes : minutes;

  //   this.clockTime = hours + ':' + minutes;
  // }

}
