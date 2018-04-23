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
      .subscribe(data => {
        // let matches = data['matches'];
        // console.log(matches);
        // let deets = matches.values.map(entry => {
        //   return entry.matchDeets;
        // });
        // console.log(deets);
        // let tournamentNames = data['matches'].filter(entry => {
        //   console.log(entry);
        //   // entry.'matchDeets'
        // });

        //assume your database service takes care of filtering and mapping and returns an array of whatever (strings in our case)
        this.data = ["rear naked choke", "rear naked choke", "rear naked choke", "flower sweep", "scissor sweep", "double leg", "armbar", "armbar", "bow-and-arrow choke", "kiumra"];
        let svg = d3.select("body")
          .append("svg")
          .append("g");

        svg.append("g")
          .attr("class", "slices");
        svg.append("g")
          .attr("class", "labels");
        svg.append("g")
          .attr("class", "lines");

        let width = 960,
          height = 450,
          radius = Math.min(width, height)/2;

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) {
            return d.value;
          });

        var arc = d3.svg.arc()
          .outerRadius(radius * 0.8)
          .innerRadius(radius * 0.4);

        var outerArc = d3.svg.arc()
          .innerRadius(radius * 0.9)
          .outerRadius(radius * 0.9);

        svg.attr("transform", "translate(" + width /2 + "," + height /2 +")");

        var key = function(d) { return d.data.label;};

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        var color = d3.scale.ordinal()
          .domain(this.data.filter(onlyUnique))
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
      }
    );
  }

}
