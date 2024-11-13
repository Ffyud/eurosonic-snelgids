import { Injectable, signal, WritableSignal } from '@angular/core';
import data from '../../sheet_data.json';
import { Gig } from './gig.model';
import { Day } from './day.enum';
import { Location } from './location.enum';
import { Rating } from './rating.enum';
import { Country } from './country.enum';

@Injectable({
  providedIn: 'root'
})
export class SnelgidsService {

  private readonly gigs: Gig[] = [];

  constructor() {
    this.gigs = data.map(event => ({
      artist: event['Artiest'],
      description: event['Korte beschrijving'],
      country: this.getValidCountry(event['Land']),
      location: this.getValidLocation(event['Locatie']),
      day: this.getValidDay(event['Dag']),
      time: event['Tijd'],
      rating: this.getValidRating(event['Score'])
    }));
  }

  selectedLocations: WritableSignal<Location[]> = signal(this.getAllLocations());

  // Method to validate location
  private getValidLocation(location: string): Location {
    return Object.values(Location).includes(location as Location) ? location as Location : Location.ONBEKEND;
  }

  // Method to validate rating
  private getValidRating(rating: string): Rating {
    return Object.values(Rating).includes(rating as Rating) ? rating as Rating : Rating.ONBEKEND;
  }

  // Method to validate day
  private getValidDay(day: string): Day {
    return Object.values(Day).includes(day as Day) ? day as Day : Day.ONBEKEND;
  }

    // Method to validate day
    private getValidCountry(country: string): Country {
      return Object.values(Country).includes(country.toUpperCase() as Country) ? country as Country : Country.Onbekend;
    }

  // Get all events
  getAllEvents(): Gig[] {
    console.log(this.gigs)
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

  getAllCountries(): Country[] {
    return Object.values(Country);
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
