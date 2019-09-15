import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.css']
})
export class TabMenuComponent implements OnInit {

  menuItems: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router) { }

  ngOnInit() {

    this.menuItems = [
      {label: 'Dashboard', icon: 'fa fa-fw fa-bar-chart'},
      {label: 'Alle Reisen', icon: 'fa fa-fw fa-calendar'},
      {label: 'Kunden', icon: 'fas fa-user-cog'}
    ];

    this.activeItem = this.menuItems[0];
  }

  selectedItem(item: MenuItem) {

    this.activeItem = item;
    console.log(this.activeItem['activeItem'].label);

    switch (this.activeItem['activeItem'].label) {

      case 'Dashboard': {
        this.router.navigate(['/dashboard']);
        break;
      }

      case 'Alle Reisen': {
        this.router.navigate(['/travels']);
        break;
      }

      case 'Kunden': {
        this.router.navigate(['/customers']);
        break;
      }

      default: {
        this.router.navigate(['/dashboard']);
        break;
      }
    }
  }

}
