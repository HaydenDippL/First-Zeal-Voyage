import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';

type Weather = {
  current: {
    rain: number,
    relativeHumidity2m: number,
    showers: number,
    snowfall: number, 
    temperature2m: number,
    time: Date
    windDirection10m: number,
    windSpeed10m: number,
  },
  daily: {
    precipitationProbabilityMax: Float32Array
    precipitationSum: Float32Array
    temperature2mMax: Float32Array
    temperature2mMin: Float32Array
    time: Date[]
    windDirection10mDominant: Float32Array
    windSpeed10mMax: Float32Array
    sunrise: Float32Array
    sunset: Float32Array
    uvIndexMax: Float32Array
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 private city!: string;
 private data!: Weather;

  constructor() { }

  search_city(city: string): void {
    // call geo API
    // TODO: hide API key
    const myHeaders = new Headers();
    myHeaders.append("X-Api-Key", "zSYVKpJURdCT4e7f4r8beA==gSnnunfC6TnY1yjJ");

    // console.log(city)

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
      headers: myHeaders,
      redirect: "follow"
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(data[0].longitude, data[0].latitude)
        this.get_weather_data(data[0].longitude, data[0].latitude)
      })
      .catch((error) => console.error(error));

    // extract longitude and latitude

    // call open meteo

    // exrtact weather data and store
  }

  async get_weather_data(longitude: number, latitude: number) {
    const params = {
      "latitude": 52.52,
      "longitude": 13.41,
      "current": ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "rain", "showers", "snowfall", "wind_speed_10m", "wind_direction_10m"],
      "daily": ["temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "uv_index_max", "uv_index_clear_sky_max", "precipitation_sum", "wind_speed_10m_max"],
      "temperature_unit": "fahrenheit",
      "wind_speed_unit": "mph",
      "precipitation_unit": "inch"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();

    const current = response.current()!;
    const daily = response.daily()!;

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature2m: current.variables(0)!.value(),
        relativeHumidity2m: current.variables(1)!.value(),
        apparentTemperature: current.variables(2)!.value(),
        rain: current.variables(3)!.value(),
        showers: current.variables(4)!.value(),
        snowfall: current.variables(5)!.value(),
        windSpeed10m: current.variables(6)!.value(),
        windDirection10m: current.variables(7)!.value(),
      },
      daily: {
        time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2mMax: daily.variables(0)!.valuesArray()!,
        temperature2mMin: daily.variables(1)!.valuesArray()!,
        sunrise: daily.variables(2)!.valuesArray()!,
        sunset: daily.variables(3)!.valuesArray()!,
        uvIndexMax: daily.variables(4)!.valuesArray()!,
        uvIndexClearSkyMax: daily.variables(5)!.valuesArray()!,
        precipitationSum: daily.variables(6)!.valuesArray()!,
        windSpeed10mMax: daily.variables(7)!.valuesArray()!,
      },
    
    };



    console.log(this.data)

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.daily.time.length; i++) {
    //   console.log(
    //     weatherData.daily.time[i].toISOString(),
    //     weatherData.daily.temperature2mMax[i],
    //     weatherData.daily.temperature2mMin[i],
    //     weatherData.daily.precipitationSum[i],
    //     weatherData.daily.precipitationProbabilityMax[i],
    //     weatherData.daily.windSpeed10mMax[i],
    //     weatherData.daily.windDirection10mDominant[i]
    //   );
    // }

  }


  get_wind_speed(istoday: boolean): number {
    return this.data!.current!.windSpeed10m;
  }

  get_wind_direction(istoday: boolean): number {
    return this.data.current.windDirection10m;
  }
  get_temp_high(istoday: boolean): number{
    return this.data.daily.temperature2mMax[istoday ? 0 : 1];
  }
  get_temp_low(istoday: boolean): number {
    return this.data.daily.temperature2mMin[istoday ? 0 : 1];
  }
  get_humidity(istoday: boolean): number {
    return this.data.current.relativeHumidity2m;
  }
  get_precipitation_forecast(is7day: boolean): any{
    return this.data.daily.precipitationSum;
  }
  get_humidity_forecast(is7day: boolean): any{
    return this.data.daily.precipitationSum;
  }
  get_temperature_forecast(is7day: boolean): any{
    return this.data.daily.temperature2mMax;

  }
  get_sunrise(): any{
    return this.data.daily.sunrise;
  }
  get_sunset():any{
    return this.data.daily.sunset;
  }
  get_uv_index():any{
    return this.data.daily.uvIndexMax;
  }





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
