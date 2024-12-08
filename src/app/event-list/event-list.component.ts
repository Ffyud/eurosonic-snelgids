import { Component, input } from '@angular/core';
import { EventCardComponent } from "./event-card/event-card.component";
import { Gig } from '../gig.model';
import { Location } from '../location.enum';
import { Day } from '../day.enum';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})

export class EventListComponent {
  
  eventList = input.required<Gig[]>();

  selectedLocationsList = input.required<Location[]>();
  selectedDay = input.required<Day>();
}
