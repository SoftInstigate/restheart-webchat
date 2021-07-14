import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageDateDivider'
})
export class MessageDateDividerPipe implements PipeTransform {
  private today = new Date();

  private numberToMonth: Map<number, string> = new Map([
    [0, 'January'],
    [1, 'February'],
    [2, 'March'],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [12, 'December']
  ]);

  transform(value: string, ...args: unknown[]): string {
    const timestamp = Date.parse(value);
    let inputDate: Date;

    if (isNaN(timestamp) === false) {
      inputDate = new Date(value);
    } else {
      return '';
    }

    if(this.isToday(inputDate)) return '';
    if(this.isYesterday(inputDate)) return 'Yesterday';

    return inputDate.getDate() + ' ' + this.numberToMonth.get(inputDate.getMonth());
  }


  private isToday(date: Date): boolean {
    return (this.today.getDate() === date.getDate()) && (this.today.getMonth() === date.getMonth());
  }

  private isYesterday(date: Date): boolean {
    return (this.today.getDate() -1) === date.getDate() && this.today.getMonth() === date.getMonth();
  }


}
