import { Injectable, signal, WritableSignal } from '@angular/core';
import data from '../../sheet_data.mock.json';
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

  selectedLocations: WritableSignal<Location[]> = signal(this.getLocations()); // TODO bewaren in localstorage

  favoriteEvents: WritableSignal<Gig[]> = signal(this.getFavoritesFromLocalStorage());

  private getFavoritesFromLocalStorage(): Gig[] {
    const storedFavorites = localStorage.getItem('favoriteEvents');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavoritesToLocalStorage(favorites: Gig[]): void {
    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }

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
  getEvents(): Gig[] {
    const gigWithFavorites = this.gigs.map((gig: Gig) => ({
      ...gig,
      favorite: this.favoriteEvents().some((favoriteGig) => favoriteGig.artist === gig.artist)
    }));
    console.log(gigWithFavorites)
    return gigWithFavorites;
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

  // Get all favorite events
  getFavoriteEvents(): Gig[] {
    return this.favoriteEvents();
  }

  isFavoriteEvent(gig: Gig): boolean {
    return this.favoriteEvents().includes(gig);
  }

  getFavoriteEventsLocations(): Location[] {
    const locations: Location[] = this.favoriteEvents().map((gig: Gig) => { return gig.location });
    const uniqueLocations: Location[] = locations.filter((value, index, array) => array.indexOf(value) === index);
    return uniqueLocations;
  }

  setFavoriteEvents(gig: Gig): void {
    // TODO veld favorite altijd op true zetten
    const isInFavoriteEvents: boolean = this.favoriteEvents().some((value: Gig) => value.artist === gig.artist);
    if (isInFavoriteEvents) {
      const updatedList: Gig[] = this.favoriteEvents().filter((value: Gig) => value.artist !== gig.artist);
      this.favoriteEvents.update(() => { return updatedList });
      this.saveFavoritesToLocalStorage(updatedList);
    } else {
      const updatedList: Gig[] = [gig, ...this.favoriteEvents()];
      this.favoriteEvents.update(() => { return updatedList });
      this.saveFavoritesToLocalStorage(updatedList);
    }
    console.log('Favoriete optredens geüpdate', this.favoriteEvents());
  }

  // Get all locations
  getLocations(): Location[] {
    return Object.values(Location);
  }

  // Get all countries
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
    console.log('Geselecteerde locaties geüpdate', this.selectedLocations());
  }

}
