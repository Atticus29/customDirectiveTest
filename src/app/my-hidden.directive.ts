import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[my-hidden]'
})
export class MyHiddenDirective {

  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'display', 'none');
  }

}
