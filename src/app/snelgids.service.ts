import { Injectable, signal, WritableSignal } from '@angular/core';
import data from '../../sheet_data.json';
import { Gig } from './gig.model';
import { Day } from './day.enum';
import { Location } from './location.enum';
import { Rating } from './rating.enum';

@Injectable({
  providedIn: 'root'
})
export class SnelgidsService {

  private gigs: Gig[] = [];

  constructor() {

    this.gigs = data.map(event => ({
      artist: event['Artiest'],
      description: event['Korte beschrijving'],
      origin: event['Land'],
      location: this.getValidLocation(event['Locatie']),
      day: this.getValidDay(event['Dag']),
      time: event['Tijd'],
      rating: this.getValidRating(event['Score'])
    }));
  }

  selectedLocations: WritableSignal<Location[]> = signal(this.getAllLocations());

  private getValidLocation(location: string): Location {
    return Object.values(Location).includes(location as Location) ? location as Location : Location.ONBEKEND;
  }

  private getValidRating(rating: string): Rating {
    return Object.values(Rating).includes(rating as Rating) ? rating as Rating : Rating.ONBEKEND;
  }

  // Method to validate day and return default if unknown
  private getValidDay(day: string): Day {
    return Object.values(Day).includes(day as Day) ? day as Day : Day.ONBEKEND;
  }

  // Get all events
  getAllEvents(): Gig[] {
    return this.gigs;
  }

  // Get a single event by artist name
  getEvent(artist: string): Gig | undefined {
    return this.gigs.find(event => event.artist === artist);
  }

  // Get events by location and/or day
  getEventsByFilter(locations?: Location[], days?: Day[]): Gig[] {
    return this.gigs.filter(event =>
      (!locations || locations.includes(event.location)) &&
      (!days || days.includes(event.day))
    );
  }

  // Get all locations
  getAllLocations(): Location[] {
    return Object.values(Location);
  }

  // Get user selected locations
  getSelectedLocations(): Location[] {
    return this.selectedLocations();
  }

  // Set or unset a user selected location
  setSelectedLocations(location: Location): void {
    const locationExists: boolean = this.selectedLocations().includes(location);
    if (locationExists) {
      const updatedList: Location[] = this.selectedLocations().filter((value: Location) => value !== location);
      this.selectedLocations.update(() => { return updatedList });

    } else {
      this.selectedLocations.update(() => { return [location, ...this.selectedLocations()] });
    }
    console.log('Select geüpdate', this.selectedLocations());
  }

}
