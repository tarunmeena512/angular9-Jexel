import { Component, ViewChild, ElementRef } from "@angular/core";
import * as jexcel from "jexcel";
import { WindowRef } from '../app/service/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild("spreadsheet") spreadsheet: ElementRef;
  constructor(
    private winRef: WindowRef
  ){
    winRef.nativeWindow["SUMCOL"] = function (instance, columnId) {
      var total = 0;
      for (var j = 0; j < instance.options.data.length; j++) {
          if (Number(instance.records[j][columnId-1].innerHTML)) {
              total += Number(instance.records[j][columnId-1].innerHTML);
          }
      }
      return total;
    }
  }

  data = [
    ['Cheese', 10, 6.00, "=B1*C1"],
    ['Apples', 5, 4.00, "=B2*C2"],
    ['Carrots', 5, 1.00, "=B3*C3"],
    ['Oranges', 6, 2.00, "=B4*C4"],
];

  ngAfterViewInit() {

    var table = jexcel(this.spreadsheet.nativeElement, {
      data:this.data,
      minDimensions: [4,10],
      columnDrag:true,
      editable:false,
      footers: [['Total','=SUMCOL(TABLE(), COLUMN())','=SUMCOL(TABLE(), COLUMN())','=SUMCOL(TABLE(), COLUMN())']],
      columns: [{
          width:'200px',
      }]
    });
  }

}
