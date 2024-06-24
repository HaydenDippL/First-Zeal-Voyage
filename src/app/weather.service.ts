import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum Day {
  YESTERDAY = 0,
  TODAY = 1
};

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
    weather_code: number[];
    precipitation_probability_max: number[];
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
 private weather_data_subject = new BehaviorSubject<WeatherObject | null>(null);
 private weather_data$ = this.weather_data_subject.asObservable();

  constructor(private http: HttpClient) { }

  search_city(city: string): void {
    this.city = city;

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
      daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,weather_code,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      precipitation_unit: 'inch',
      timezone: 'America/Chicago'
    };

    this.http.get<WeatherObject>(url, { params })
      .subscribe({
        next: data => this.weather_data_subject.next(data),
        error: error => console.error(error)
      });
  }

  // FIXME: 
  get_city_state() {
    return this.weather_data$.pipe(
      map(city_state => {
        return this.city;
      })
    )
  }

  get_weather_codes() {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return [];
        else return data.daily.weather_code;
      })
    )
  }

  get_precipitation_probabilities() {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return [];
        else return data.daily.precipitation_probability_max;
      })
    )
  }

  get_wind_speed(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else if (day == Day.TODAY) return data.current.wind_speed_10m;
        else return data.daily.wind_speed_10m_max[day];
      })
    );
  }

  get_wind_gust_speed(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.wind_gusts_10m;
      })
    )
  }

  get_wind_direction(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.wind_direction_10m;
      })
    );
  }

  get_temperature(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.current.temperature_2m);
      })
    );
  }

  get_humidity(): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return data.current.relative_humidity_2m;
      })
    );
  }

  get_uv_index(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Number(data.daily.uv_index_max[day].toFixed(1));
      })
    );
  }

  get_temperature_high(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.daily.temperature_2m_max[day]);
      })
    );
  }

  get_temperature_low(day: Day): Observable<number> {
    return this.weather_data$.pipe(
      map(data => {
        if (!data) return 0;
        else return Math.round(data.daily.temperature_2m_min[day]);
      })
    );
  }

  get_temperature_forecast(): Observable<number[]> {
    const expected_length = 7;
    const hi_weight = 0.75;
    const lo_weight = 1 - hi_weight;

    const max_rand_temp = 84;
    const min_rand_temp = max_rand_temp - 20;
    return this.weather_data$.pipe(
      map(data => {
        if (!data) {
          return Array.from({ length: expected_length }, (_, i) => {
            return Math.floor(Math.random() * (max_rand_temp - min_rand_temp + 1)) + min_rand_temp;
          })
        } else {
          return data.daily.temperature_2m_max.map((max, i) => {
            return max * hi_weight + data.daily.temperature_2m_min[i] * lo_weight;
          });
        }
      })
    )
  }
}