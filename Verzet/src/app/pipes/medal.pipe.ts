import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'medal'
})
export class MedalPipe implements PipeTransform {

  transform(value: number): any {
    switch (value) {
      case 1:
        return '<p class="circle gold">1</p>';
      case 2:
        return '<p class="circle silver">2</p>';
      case 3:
        return '<p class="circle bronze">3</p>';
      default: 
        return value;
    }
  }

}
