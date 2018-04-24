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
        // let tournamentNames = data['matches'].map(entry => {
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
        };

        var color = d3.scale.ordinal()
          .domain(this.data.filter(onlyUnique))
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

          function getData(){
            let labels = color.domain();
            return labels.map(function(label){
              return {label: label, value: getCount(label, data)}
            });
          }

          function getCount(label:string, data: string[]){
            var counts = {};
            for (var i = 0; i < data.length; i++) {
              var num = data[i];
              counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            return counts[label];
          }

          change(getData());

          function change(data){
            // PIE SLICES
            var slice = svg.select(".slices").selectAll("path.slice")
              .data(pie(data), key);

            slice.enter()
              .insert("path")
              .style("fill", function(d) { return color(d.data.label);})
              .attr("class", "slice");

            slice
              .transition().duration(1000)
              .attrTween("d", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t){
                  return arc(interpolate(t));
                };
              })

            slice.exit()
              .remove();

            // TEXT LABELS
            var text = svg.select(".labels").selectAll("text")
              .data(pie(data), key);

            text.enter()
              .append("text")
              .attr("dy", ".35em")
              .text(function(d){
                return d.data.label;
              });

            function midAngle(d){
              return d.startAngle + (d.endAngle - d.startAngle)/2;
            }

            text.transition().duration(1000)
              .attrTween("transform", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t){
                  var d2= interpolate(t);
                  var pos = outerArc.centroid(d2);
                  pos[0] = radius * (midAngle(d2) < Math.PI ? 1: -1);
                  return "translate(" + pos + ")";
                };
              })
              .styleTween("text-anchor", function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(0);
                return function(t){
                  var d2 = interpolate(t);
                  return midAngle(d2) < Math.PI ? "start": "end";
                };
              });

              text.exit()
                .remove();


              // SLICE TO TEXT POLYLINES

              var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key);

              polyline.enter()
                .append("polyline");

              polyline.transition().duration(1000)
                .attrTween("points", function(d){
                  this._current = this._current || d;
                  var interpolate = d3.interpolate(this._current, d);
                  this._current = interpolate(0);
                  return function (t){
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1: -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                  };
                });

              polyline.exit()
                .remove();
          };
      }
    );
  }





}
