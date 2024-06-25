import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';

@Injectable({
  providedIn: 'root'
})
export class ScreenShotService {
  
  imgBase64 = '';
  constructor(private captureService: NgxCaptureService) {}
  //@ViewChild('screen', { static: true }) screen: any;
  @ViewChild('AddClient') someInput!: ElementRef;
  async capture(Element:HTMLElement) {
    this.captureService
      .getImage(Element, true)
      .subscribe((img:string) => {
        this.imgBase64 = img;
        this.downloadJson();
      });
  }

  downloadJson() {
    var element = document.createElement('a');
    element.setAttribute('href', this.imgBase64);
    element.setAttribute('download', 'test.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  
}
