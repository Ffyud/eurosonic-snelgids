import { Component, inject, Input, computed, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SelectDayComponent } from "./select-day/select-day.component";
import { SelectLocationComponent } from "./select-location/select-location.component";
import { SnelgidsService } from './snelgids.service';
import { Gig } from './gig.model';
import { Location } from './location.enum';
import { EventListComponent } from './event-list/event-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SelectDayComponent, SelectLocationComponent, EventListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eurosonic-snelgids';

  snelgidsService = inject(SnelgidsService);

  @Input() eventsList: Signal<Gig[]> = computed(() => this.snelgidsService.getAllEvents());
  @Input() selectedLocationsList: Signal<Location[]> = computed(() => this.snelgidsService.getSelectedLocations());


  
}
