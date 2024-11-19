import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectDayComponent } from "./select-day/select-day.component";
// import { SelectLocationComponent } from "./select-location/select-location.component";
import { EventListComponent } from './event-list/event-list.component';
import { TapBarNavComponent } from "./tap-bar-nav/tap-bar-nav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectDayComponent, EventListComponent, TapBarNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eurosonic-snelgids';
  
}
