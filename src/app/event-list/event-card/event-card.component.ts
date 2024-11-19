import { Component, Signal, Input, inject } from '@angular/core';
import { Gig } from '../../gig.model';
import { Rating } from '../../rating.enum';
import { Country } from "../../country.enum";
import { SnelgidsService } from '../../snelgids.service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  protected snelgidsService = inject(SnelgidsService);

  @Input() gig!: Gig;

  setAsFavorite(gig: Gig): void {
    this.snelgidsService.setFavoriteEvents(gig);
  }

  rating = Rating;

  country = Country;

}
