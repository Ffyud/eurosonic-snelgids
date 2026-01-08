import { Component, inject, input, InputSignal } from '@angular/core';
import { Gig } from '../../gig.model';
import { Rating } from '../../rating.enum';
import { Country } from "../../country.enum";
import { SnelgidsService } from '../../snelgids.service';
import { NgClass } from '@angular/common';
import { Day } from '../../day.enum';

@Component({
  selector: 'app-event-card',
  imports: [NgClass],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  private readonly snelgidsService = inject(SnelgidsService);

  gig: InputSignal<Gig> = input.required<Gig>();
  selectedDay: InputSignal<Day | undefined> = input<Day | undefined>();

  setAsFavorite(gig: Gig): void {
    this.snelgidsService.setFavoriteEvents(gig);
  }

  getFullDay(day: Day): string {
    return this.dayMap[day] || "";
  }

  getFlag(country: Country): string {
    return this.countryFlagMap[country] || "";
  }

  getCountryLabel(code: Country): string {
    const entry = Object.entries(Country).find(([, value]) => value === code);
    return entry ? entry[0].replace('_', ' ') : code;
  }

  dayMap: Record<Day, string> = {
    [Day.WO]: "woensdag",
    [Day.DO]: "donderdag",
    [Day.VR]: "vrijdag",
    [Day.ZA]: "zaterdag",
    [Day.ALLE]: "",
    [Day.ONBEKEND]: "",
  };

  countryFlagMap: Record<Country, string> = {
    [Country.Spanje]: "es",
    [Country.Frankrijk]: "fr",
    [Country.België]: "be",
    [Country.Engeland]: "gb-eng",
    [Country.Noorwegen]: "no",
    [Country.Nederland]: "nl",
    [Country.Duitsland]: "de",
    [Country.Kroatië]: "hr",
    [Country.Italië]: "it",
    [Country.Slovenië]: "si",
    [Country.Zweden]: "se",
    [Country.Ierland]: "ie",
    [Country.Letland]: "lv",
    [Country.Zwitserland]: "ch",
    [Country.Denemarken]: "dk",
    [Country.Faeröer]: "fo",
    [Country.Hongarije]: "hu",
    [Country.Oostenrijk]: "at",
    [Country.Estland]: "ee",
    [Country.Polen]: "pl",
    [Country.Finland]: "fi",
    [Country.Servië]: "rs",
    [Country.Tsjechië]: "cz",
    [Country.Portugal]: "pt",
    [Country.Luxemburg]: "lu",
    [Country.Slowakije]: "sk",
    [Country.Romenië]: "ro",
    [Country.Oekraïne]: "ua",
    [Country.Ijsland]: "is",
    [Country.Wit_Rusland]: "by",
    [Country.Cyprus]: "cy",
    [Country.Georgië]: "ge",
    [Country.Moldavië]: "md",
    [Country.Schotland]: "gb-sct",
    [Country.Wales]: "gb-wls",
    [Country.Noord_Ierland]: "gb-nir",
    [Country.Kosovo]: "xk",
    [Country.Bulgarije]: "bg",
    [Country.Griekenland]: "gr",
    [Country.Noord_Macedonië]: "mk",
    [Country.Onbekend]: ""
  };

  rating = Rating;

  country = Country;

  day = Day;

}
