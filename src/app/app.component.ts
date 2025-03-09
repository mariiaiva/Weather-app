import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherCardsComponent } from '../components/weather-cards/weather-cards.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ WeatherCardsComponent, FormsModule, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-app';
}
