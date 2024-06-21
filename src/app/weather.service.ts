import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export type WeatherObject = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    rain: string;
    showers: string;
    snowfall: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    rain: number;
    showers: number;
    snowfall: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    uv_index_clear_sky_max: string;
    precipitation_sum: string;
    wind_speed_10m_max: string;
    wind_gusts_10m_max: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    wind_direction_10m_dominant: number[]
  };
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
 private city!: string;
 private dataSubject = new BehaviorSubject<WeatherObject | null>(null);

  constructor(private http: HttpClient) { }

  search_city(city: string): void {
    const headers = new HttpHeaders().set("X-Api-Key", "zSYVKpJURdCT4e7f4r8beA==gSnnunfC6TnY1yjJ");
    this.http.get<any[]>(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, { headers })
      .pipe(map(response => response[0]))
      .subscribe({
        next: data => this.get_weather_data(data.longitude, data.latitude),
        error: error => console.error(error)
    });
  }

  get_weather_data(longitude: number, latitude: number) {
    const url = "https://api.open-meteo.com/v1/forecast";
    const params = {
      latitude: latitude,
      longitude: longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,showers,snowfall,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
      daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'America/Chicago'
    };

    console.log(longitude, latitude)

    this.http.get<WeatherObject>(url, { params })
      .subscribe({
        next: data => this.dataSubject.next(data),
        error: error => console.error(error)
      });
  }

  getWeatherUpdates() {
    return this.dataSubject.asObservable();
  }

  get_wind_speed(istoday: boolean): number {
    const data = this.dataSubject.value;
    if (!data) return 0;
    return istoday ? data.current.wind_speed_10m : data.daily.wind_speed_10m_max[1];
  }

  get_wind_direction(istoday: boolean): number {
    const data = this.dataSubject.value;
    if (!data) return 0;
    return istoday ? data.current.wind_direction_10m : data.daily.wind_direction_10m_dominant[1];
  }

  get_temp_high(istoday: boolean): number {
    const data = this.dataSubject.value;
    if (!data) return 0;
    return data.daily.temperature_2m_max[istoday ? 0 : 1];
  }

  get_temp_low(istoday: boolean): number {
    const data = this.dataSubject.value;
    if (!data) return 0;
    return data.daily.temperature_2m_min[istoday ? 0 : 1];
  }

  get_humidity(istoday: boolean): number {
    const data = this.dataSubject.value;
    if (!data) return 0;
    return data.current.relative_humidity_2m;
  }

  get_precipitation_forecast(): any {
    const data = this.dataSubject.value;
    if (!data) return null;
    return data.daily.precipitation_sum;
  }

  get_temperature_forecast(): any {
    const data = this.dataSubject.value;
    if (!data) return null;
    return data.daily.temperature_2m_max;
  }

  get_sunrise(): any {
    const data = this.dataSubject.value;
    if (!data) return null;
    return data.daily.sunrise;
  }

  get_sunset(): any {
    const data = this.dataSubject.value;
    if (!data) return null;
    return data.daily.sunset;
  }

  get_uv_index(): any {
    const data = this.dataSubject.value;
    if (!data) return null;
    return data.daily.uv_index_max;
  }
}