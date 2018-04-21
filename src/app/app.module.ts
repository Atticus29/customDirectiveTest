import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PointsScoredDirective } from './points-scored.directive';
import { MyHiddenDirective } from './my-hidden.directive';


@NgModule({
  declarations: [
    AppComponent,
    PointsScoredDirective,
    MyHiddenDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
