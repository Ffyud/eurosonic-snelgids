import { Component, Signal, Input } from '@angular/core';
import { Gig } from '../../gig.model';
import { Rating } from '../../rating.enum';
import { Country } from "../../country.enum";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {

  @Input() gig!: Gig;

  rating = Rating;

  country = Country;

}
