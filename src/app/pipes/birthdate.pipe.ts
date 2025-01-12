import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthdate',
})
export class BirthdatePipe implements PipeTransform {
  //"1996-5-3" -> "03/05/1996"
  transform(value: string): string | undefined {
    if(!value) return;

    const arr = value.split('-');
    const { day, month, year } = {
      day: arr[2].padStart(2, '0'),
      month: arr[1].padStart(2, '0'),
      year: arr[0],
    };

    return `${day}/${month}/${year}`;
  }
}
