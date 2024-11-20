import { Component, computed, inject, Input, Signal } from '@angular/core';
import { SnelgidsService } from '../snelgids.service';
import { Location } from '../location.enum';
import { EventListComponent } from '../event-list/event-list.component';

@Component({
  selector: 'app-page-favorites',
  standalone: true,
  imports: [EventListComponent],
  templateUrl: './page-favorites.component.html',
  styleUrl: './page-favorites.component.css'
})
export class PageFavoritesComponent {

  snelgidsService = inject(SnelgidsService);

  protected readonly favoriteEvents = this.snelgidsService.getFavoriteEvents();
  protected readonly favoriteEventsLocations = this.snelgidsService.getFavoriteEventsLocations();

  @Input() selectedLocationsList: Signal<Location[]> = computed(() => this.snelgidsService.getSelectedLocations());

}
