import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  //+81 965-431-3024 -> +(81) 965-431-3024
  transform(phone:string): string | undefined {
    if(!phone) return ;
    const countryCode = phone.split(" ")[0];
    const secondPart = phone.split(" ")[1];
    const code = countryCode.split("+")[1];

    return `+(${code}) ${secondPart}`

  }

}
