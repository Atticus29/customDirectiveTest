import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';

@Component({
  selector: 'app-points-display',
  templateUrl: './points-display.component.html',
  styleUrls: ['./points-display.component.css']
})
export class PointsDisplayComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;
  private data: any;

  constructor(element: ElementRef, d3Service: D3Service){
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let d3 = this.d3;
    d3.json("datajitsu-export.json", function(error, data) {
      this.data = data;
      console.log(this.data); // this is your data
    });
    let d3ParentElement: Selection<any, any, any, any>;
    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
      let test = d3.select('body').append('svg');
      // Do more D3 things
    }
  }

}
