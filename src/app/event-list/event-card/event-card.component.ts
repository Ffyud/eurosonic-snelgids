import { Component, Signal, Input, inject, signal, input, InputSignal, computed } from '@angular/core';
import { Gig } from '../../gig.model';
import { Rating } from '../../rating.enum';
import { Country } from "../../country.enum";
import { SnelgidsService } from '../../snelgids.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  protected snelgidsService = inject(SnelgidsService);

  gig: InputSignal<Gig> = input.required<Gig>();

  setAsFavorite(gig: Gig): void {
    this.snelgidsService.setFavoriteEvents(gig);
  }


  getFlag(country: Country): string {
    return this.countryFlagMap[country] || "";
  }

  countryFlagMap: { [key in Country]: string } = {
    [Country.Spanje]: "🇪🇸",
    [Country.Frankrijk]: "🇫🇷",
    [Country.België]: "🇧🇪",
    [Country.Engeland]: "🇬🇧",
    [Country.Noorwegen]: "🇳🇴",
    [Country.Nederland]: "🇳🇱",
    [Country.Duitsland]: "🇩🇪",
    [Country.Kroatië]: "🇭🇷",
    [Country.Italië]: "🇮🇹",
    [Country.Slovenië]: "🇸🇮",
    [Country.Zweden]: "🇸🇪",
    [Country.Ierland]: "🇮🇪",
    [Country.Letland]: "🇱🇻",
    [Country.Zwitserland]: "🇨🇭",
    [Country.Denemarken]: "🇩🇰",
    [Country.Faeröer]: "🇫🇴",
    [Country.Hongarije]: "🇭🇺",
    [Country.Oostenrijk]: "🇦🇹",
    [Country.Estland]: "🇪🇪",
    [Country.Polen]: "🇵🇱",
    [Country.Finland]: "🇫🇮",
    [Country.Servië]: "🇷🇸",
    [Country.Tsjechië]: "🇨🇿",
    [Country.Portugal]: "🇵🇹",
    [Country.Luxemburg]: "🇱🇺",
    [Country.Slowakije]: "🇸🇰",
    [Country.Oekraïne]: "🇺🇦",
    [Country.Ijsland]: "🇮🇸",
    [Country.Onbekend]: ""
};

  rating = Rating;

  country = Country;

}
