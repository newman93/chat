import { Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'text-center');
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'text-center');
  }

}
