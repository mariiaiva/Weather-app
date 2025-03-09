import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-cards',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather-cards.component.html',
  styleUrl: './weather-cards.component.css',
  providers: [WeatherService],
})
export class WeatherCardsComponent implements OnInit {
  cityName = 'Kyiv';
  data = {
    temp: '',
    feelsLike: '',
    pressure: '',
    humidity: '',
    city: '',
    main: '',
    imageURL: '',
    windSpeed: '',
  };

  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.cityName) {
      this.weatherService.fetchData(this.cityName).subscribe({
        next: (data: any) => {
          this.data.temp = data.main.temp;
          this.data.feelsLike = data.main.feels_like;
          this.data.pressure = data.main.pressure;
          this.data.humidity = data.main.humidity;
          this.data.city = data.name;
          this.data.imageURL = data.weather[0].icon;
          this.data.main = data.weather[0].main;
          this.data.windSpeed = data.wind.speed;
        },
        error: (error) => alert('Error while fetching data'),
      });
    }
  }
}