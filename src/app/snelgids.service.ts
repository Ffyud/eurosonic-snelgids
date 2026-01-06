import { Injectable, signal, WritableSignal } from '@angular/core';
import data from '../../sheet_data_2026.json';
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
      time: this.getValidTime(event['Tijd']),
      timeEnd: this.getValidEndTime(event['Tijd']),
      rating: this.getValidRating(event['Score'])
    }));
  }

  selectedDay: WritableSignal<Day> = signal(this.getSelectedDayFromLocalStorage());

  // TODO dag altijd default op juiste datum indien tijdens festival (na een tijdstip)
  private getSelectedDayFromLocalStorage(): Day {
    const storedSelectedDay = localStorage.getItem('selectedDay');
    return storedSelectedDay ? JSON.parse(storedSelectedDay) : Day.WO;
  }

  private saveSelectedDayToLocalStorage(day: Day): void {
    localStorage.setItem('selectedDay', JSON.stringify(day));
  }

  selectedLocations: WritableSignal<Location[]> = signal(this.getLocationsFromLocalStorage());

  private getLocationsFromLocalStorage(): Location[] {
    const storedLocations = localStorage.getItem('locations');
    return storedLocations ? JSON.parse(storedLocations) : this.getLocations();
  }

  private saveLocationsToLocalStorage(locations: Location[]): void {
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  favoriteEvents: WritableSignal<Gig[]> = signal(this.getFavoritesFromLocalStorage());

  private getFavoritesFromLocalStorage(): Gig[] {
    const storedFavorites = localStorage.getItem('favoriteEvents');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavoritesToLocalStorage(favorites: Gig[]): void {
    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }

  private getValidLocation(location: string): Location {
    return Object.values(Location).includes(location as Location) ? location as Location : Location.ONBEKEND;
  }

  private getValidRating(rating: string): Rating {
    return Object.values(Rating).includes(rating as Rating) ? rating as Rating : Rating.ONBEKEND;
  }

  private getValidDay(day: string): Day {
    return Object.values(Day).includes(day as Day) ? day as Day : Day.ONBEKEND;
  }

  private getValidCountry(country: string): Country {
    return Object.values(Country).includes(country.toUpperCase() as Country) ? country.toUpperCase() as Country : Country.Onbekend;
  }

  private getValidTime(time: string): string {
    return time.trim().split('-')[0]?.replace('.', ":");
  }

  private getValidEndTime(time: string): string {
    return time.trim().split('-')[1]?.replace('.', ":");
  }

  private dayOrder = {
    [Day.WO]: 1,
    [Day.DO]: 2,
    [Day.VR]: 3,
    [Day.ZA]: 4,
    [Day.ALLE]: 5,
    [Day.ONBEKEND]: 6,
  };

  // Get all events
  getEvents(locations?: Location[], days?: Day[]): Gig[] {
    console.log('👋🧑‍💻 https://github.com/Ffyud/eurosonic-snelgids')

    const gigs: Gig[] = this.gigs.filter(event =>
      (!locations || locations.includes(event.location)) &&
      (!days || days.includes(event.day))
    );

    // Sorteer chronologisch, inclusief avond en nacht
    const gigsSorted: Gig[] = gigs.sort((a, b) => {
      const hourA = Number(a.time.split(":")[0]);
      const hourB = Number(b.time.split(":")[0]);

      const isPastMidnight = (hour: number) => hour >= 0 && hour < 4;

      if (isPastMidnight(hourA) && !isPastMidnight(hourB)) {
        return 1;
      }
      if (!isPastMidnight(hourA) && isPastMidnight(hourB)) {
        return -1;
      }
      return a.time.localeCompare(b.time);
    });

    // Verrijk lijst met gekozen favorieten (true/false) van gebruiker
    const gigWithFavorites = gigsSorted.map((gig: Gig) => ({
      ...gig,
      favorite: this.favoriteEvents().some((favoriteGig) => favoriteGig.artist === gig.artist)
    }));

    return gigWithFavorites;
  }

  // Get a single event by artist name
  getEvent(artist: string): Gig | undefined {
    return this.gigs.find(event => event.artist === artist);
  }

  // Get all favorite events
  getFavoriteEvents(): Gig[] {
    return this.favoriteEvents().sort((a: Gig, b: Gig) => this.dayOrder[a.day] - this.dayOrder[b.day]);
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
    const isInFavoriteEvents: boolean = this.favoriteEvents().some((value: Gig) => value.artist === gig.artist);
    if (isInFavoriteEvents) {
      gig.favorite = false;
      const updatedList: Gig[] = this.favoriteEvents().filter((value: Gig) => value.artist !== gig.artist);
      this.favoriteEvents.update(() => { return updatedList });
      this.saveFavoritesToLocalStorage(updatedList);
    } else {
      gig.favorite = true;
      const updatedList: Gig[] = [gig, ...this.favoriteEvents()];
      this.favoriteEvents.update(() => { return updatedList });
      this.saveFavoritesToLocalStorage(updatedList);
    }
    console.log('Favoriete optredens geüpdate', this.favoriteEvents());
  }

  // Get all locations
  getLocations(): Location[] {
    return Object.values(Location).sort((a: Location, b: Location) => (a as string).localeCompare(b as string)).filter(location => location !== Location.ONBEKEND);
  }

  // Get all countries
  getCountries(): Country[] {
    return Object.values(Country);
  }

  // Get all days
  getDays(): Day[] {
    return Object.values(Day).filter(day => day !== Day.ONBEKEND);
  }

  getSelectedDay(): Day {
    return this.selectedDay();
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
      this.saveLocationsToLocalStorage(updatedList);

    } else {
      const updatedList: Location[] = [location, ...this.selectedLocations()];
      this.selectedLocations.update(() => { return updatedList });
      this.saveLocationsToLocalStorage(updatedList);
    }
    console.log('Geselecteerde locaties geüpdate', this.selectedLocations());
  }

  setSelectedDay(day: Day): void {
    this.selectedDay.update(() => { return day });
    this.saveSelectedDayToLocalStorage(day);
    console.log('Geselecteerde dag geüpdate', this.selectedDay());

  }

}
