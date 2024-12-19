import { Component, computed, inject, Signal } from '@angular/core';
import { SelectDayComponent } from "../select-day/select-day.component";
import { EventListComponent } from "../event-list/event-list.component";
import { SnelgidsService } from '../snelgids.service';
import { Gig } from '../gig.model';
import { Location } from '../location.enum';
import { FilterLocationsComponent } from "../filter-locations/filter-locations.component";
import { Day } from '../day.enum';

@Component({
  selector: 'app-timetable-page',
  standalone: true,
  imports: [SelectDayComponent, EventListComponent, FilterLocationsComponent],
  templateUrl: './timetable-page.component.html',
  styleUrl: './timetable-page.component.css'
})
export class TimetablePageComponent {

  snelgidsService = inject(SnelgidsService);
  
  protected readonly eventsList: Signal<Gig[]> = computed(() => this.snelgidsService.getEvents());
  protected readonly selectedLocationsList: Signal<Location[]> = computed(() => this.snelgidsService.getSelectedLocations());
  protected readonly selectedDay: Signal<Day> = computed(() => this.snelgidsService.getSelectedDay());

}
