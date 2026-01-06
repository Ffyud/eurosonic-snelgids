import { Component, inject } from '@angular/core';
import { SnelgidsService } from '../snelgids.service';
import { Day } from '../day.enum';

@Component({
    selector: 'app-select-day',
    imports: [],
    templateUrl: './select-day.component.html',
    styleUrl: './select-day.component.css'
})
export class SelectDayComponent {

  protected snelgidsService = inject(SnelgidsService);

  selectedDay: Day = this.snelgidsService.getSelectedDay();
  // FIXME dag mag niet "ALLE" zijn hier want selectie gaat mis
  days: Day[] = this.snelgidsService.getDays().filter((day: Day) => day !== Day.ALLE);

  dayBack(day: Day): void {
    const currentDay = this.days.indexOf(day);
    const lastIndex: number = (currentDay - 1 + this.days.length) % this.days.length;

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
      case Day.WO:
        return "Woensdag 14 januari"
      case Day.DO:
        return "Donderdag 15 januari"
      case Day.VR:
        return "Vrijdag 16 januari"
      case Day.ZA:
        return "Zaterdag 17 januari"
      default:
        return "Onbekend"
      }
  }
}
