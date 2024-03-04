import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameDisplayComponent } from './name-display/name-display.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NameDisplayComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DungeonDex';
}
