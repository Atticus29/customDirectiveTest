import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PointsScoredDirective } from './points-scored.directive';
import { MyHiddenDirective } from './my-hidden.directive';
import { D3Service } from 'd3-ng2-service';
import { PointsDisplayComponent } from './points-display/points-display.component';


@NgModule({
  declarations: [
    AppComponent,
    PointsScoredDirective,
    MyHiddenDirective,
    PointsDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
