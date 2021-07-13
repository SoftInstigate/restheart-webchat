import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fromMillisToDate'
})
export class FromMillisToDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): Date {
    return new Date(value);
  }

}
