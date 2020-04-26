import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('buckBunny') private buckBunny: ElementRef<HTMLVideoElement>;
  @ViewChild('audioSample') private audioSample: ElementRef<HTMLAudioElement>;

  title = 'testing-sandbox';

  ngAfterViewInit(): void {
    this.buckBunny.nativeElement.addEventListener('timeupdate', event => {
      console.log(event);
    });
  }
}
