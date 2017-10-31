import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnas'
})
export class ColumnasPipe implements PipeTransform {

  transform(items: Array<any>, col:number, even:boolean=true):  Array<any>  {
      col=col+1
      return items.filter(item => {
        if (even){
            if (col % 2 ==0) {return item}
          }else{
            if (col % 2 !=0) {return item}
          }

      });
  }

}
