import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlobImage]'
})
export class BlobImageDirective {
  @Input() appBlobImage: any;
  private el: any;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.el.src = "/assets/no-preview.jpg"
    // @ts-ignore
  }

  @HostListener('onchange') onMouseLeave() {
    this.el.src = this.getBlobUrl(this.appBlobImage);
  }

  getBlobUrl(blobData: Blob) {
    try {
      const urlCreator = window.URL || window.webkitURL;
      // @ts-ignore
      const blob = new Blob([blobData]);
      return urlCreator.createObjectURL(blob);
    } catch (e) {
      // request from backend
      return '/assets/no-preview.jpg'
    }

  }

}
