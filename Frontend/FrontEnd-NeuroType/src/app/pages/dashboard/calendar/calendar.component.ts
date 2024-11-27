import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  constructor(private userService: UserService) {}

  notes: any;


  ngOnInit(): void {

    this.userService.userNotes$.subscribe({
      next: (notes)=>{
        this.notes = notes;
      },error: (err)=>{
        console.error(err)
      }
    })
    
    this.userService.getUserNotes()

    console.log(this.notes)





    //de aqui para abajo es logica del calendario
    this.today = new Date();
    this.currentYear = this.today.getFullYear();
    this.currentMonth =this.today.getMonth(); // Meses en JavaScript van de 0 a 11
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.currentMonthString = this.getMonthString(this.currentMonth);
    this.setRandomColors();
  }








  /*Lo de abajo es la logica del funcionamiento del calendario*/







  currentYear: number = 0;
  currentMonth: number = 0;
  currentMonthString: string ='';
  calendarDays: { date: Date, day: number, color?:string }[] = []; // Array con la información de los días del mes
  weekDays: string[] = ['S','M','T','W','T','F','S'];
  today!: Date;
  dateSelected: Date = new Date;
  sameDay:boolean = false;

  generateCalendar(year: number, month: number): void {
    this.calendarDays = []; // Limpiar días anteriores

    const numberOfDays = new Date(year, month + 1, 0).getDate(); // Número de días en el mes

    for (let day = 1; day <= numberOfDays; day++) {
      this.calendarDays.push({
        date: new Date(year, month, day),
        day
      });
    }
  }

  goToPreviousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  goToNextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  getMonthString(month: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  }

  setDayColor(date: Date, color: string): void {
    const day = this.calendarDays.find(d => d.date.toDateString() === date.toDateString());
    if (day) {
      day.color = color;
    }
  }

  setRandomColors(): void {
    const colors = ['red', 'yellow', 'blue', 'green',];
    const randomDaysIndices = [3, 7, 12, 18, 25,1,]; // Índices de días seleccionados aleatoriamente
    randomDaysIndices.forEach((index, i) => {
      if (index < this.calendarDays.length) {
        this.calendarDays[index].color = colors[i % colors.length];
      }
    });
  }

  selectedDate(date: Date): void {
    this.dateSelected = date;
  }
  
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}