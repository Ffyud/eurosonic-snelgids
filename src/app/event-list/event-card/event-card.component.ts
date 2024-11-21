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

  rating = Rating;

  country = Country;

}
