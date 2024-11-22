import { Component, inject } from '@angular/core';
import { SnelgidsService } from '../snelgids.service';
import { Day } from '../day.enum';

@Component({
  selector: 'app-select-day',
  standalone: true,
  imports: [],
  templateUrl: './select-day.component.html',
  styleUrl: './select-day.component.css'
})
export class SelectDayComponent {

  protected snelgidsService = inject(SnelgidsService);

  selectedDay: Day = this.snelgidsService.getSelectedDay();
  days: Day[] = this.snelgidsService.getDays();

  dayBack(day: Day): void {
    console.log(this.days)
    const currentDay = this.days.indexOf(day);
    console.log(currentDay)
    const lastIndex: number = (currentDay - 1 + this.days.length) % this.days.length;

    console.log(this.days[lastIndex])
    this.snelgidsService.setSelectedDay(this.days[lastIndex])
    this.updateSelectedDay();
  }
  
  dayForward(day: Day): void {
    const currentDay = this.days.indexOf(day);
    const lastIndex: number = (currentDay + 1) % this.days.length;

    this.snelgidsService.setSelectedDay(this.days[lastIndex])
    this.updateSelectedDay();
  }

  updateSelectedDay(): void {
    this.selectedDay = this.snelgidsService.getSelectedDay();
  }

  getSelectedDateString(day: Day): string {
    switch(day) {
      case Day.WOE:
        return "Woensdag 5 januari"
      case Day.DON:
        return "Donderdag 6 januari"
      case Day.VRIJ:
        return "Vrijdag 7 januari"
      case Day.ZAT:
        return "Zaterdag 8 januari"
      default:
        return "Onbekend"
      }
  }
}
