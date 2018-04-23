import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-points-display',
  templateUrl: './points-display.component.html',
  styleUrls: ['./points-display.component.css']
})
export class PointsDisplayComponent implements OnInit {
  private d3: D3;
  private parentNativeElement: any;
  private httpConfig: any;
  private data: any;

  constructor(element: ElementRef, d3Service: D3Service, configService: ConfigService){
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.httpConfig = configService;
  }

  ngOnInit() {
    let d3 = this.d3;
    this.httpConfig.getConfig()
      .subscribe(data => this.data = {
        matches: data['matches']
      });
    console.log(this.data);
    let d3ParentElement: Selection<any, any, any, any>;
    if (this.parentNativeElement !== null) {
      d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
      let test = d3.select('body').append('svg');
      // Do more D3 things
    }
  }

}
