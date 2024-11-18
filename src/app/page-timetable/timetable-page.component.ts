import { Component, computed, inject, Input, Signal } from '@angular/core';
import { SelectDayComponent } from "../select-day/select-day.component";
import { EventListComponent } from "../event-list/event-list.component";
import { SnelgidsService } from '../snelgids.service';
import { Gig } from '../gig.model';
import { Location } from '../location.enum';

@Component({
  selector: 'app-timetable-page',
  standalone: true,
  imports: [SelectDayComponent, EventListComponent],
  templateUrl: './timetable-page.component.html',
  styleUrl: './timetable-page.component.css'
})
export class TimetablePageComponent {

  snelgidsService = inject(SnelgidsService);

  @Input() eventsList: Signal<Gig[]> = computed(() => this.snelgidsService.getAllEvents());
  @Input() selectedLocationsList: Signal<Location[]> = computed(() => this.snelgidsService.getSelectedLocations());


}
