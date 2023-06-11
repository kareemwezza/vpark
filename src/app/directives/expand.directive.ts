import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appExpand]'
})
export class ExpandDirective {
  private expanded = false;
  private wasInsideTheElement = false;
  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  @HostListener('click') toggleClass() {
    this.expanded = !this.expanded;
    if (!this.expanded) {
      this.renderer.removeClass(this.hostElement.nativeElement, 'expand');
    } else {
      this.renderer.addClass(this.hostElement.nativeElement, 'expand');
    }
    this.wasInsideTheElement = true;
  }

  @HostListener("document:click") clickOut(): void {
    if (!this.wasInsideTheElement) {
      this.expanded = true;
      this.toggleClass();
    }
    this.wasInsideTheElement = false;
  }

}
