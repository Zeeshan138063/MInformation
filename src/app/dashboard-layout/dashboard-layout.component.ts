import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  template: `
      <app-header></app-header>
      <preloader-full></preloader-full>
      <app-side-menu>
      </app-side-menu>
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class DashboardLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
