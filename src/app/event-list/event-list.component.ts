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

  protected hasEventsForLocation(location: Location): boolean {
    return this.eventList().some(
      event =>
        event.location === location &&
        (this.selectedDay() === this.Day.ALLE || event.day === this.selectedDay())
    );
  }

  protected fullLocationTitle(location: string): string {
    switch (location as Location) {
      case Location.BINNENZAAL:
      case Location.BOVENZAAL:
      case Location.GROTE_ZAAL:
      case Location.KLEINE_ZAAL:
      case Location.KELDER:
      case Location.KUNSTPUNT:
      case Location.MARATHONZAAL:
      case Location.FOYER_GROTE_ZAAL:
      case Location.ENTREEHAL:
        return "Oosterpoort " + location;
      case Location.FORUM_RABO:
        return "Forum Rabostudio";  
      default:
        return location;
    }
  }

  Day = Day;
}
