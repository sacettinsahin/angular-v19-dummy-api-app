import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  //"female" -> "F", "male" -> "M"
  transform(gender:string): string | undefined {
    if(!gender) return;
    
    return gender.charAt(0).toUpperCase();
  }

}
