import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  navItems?: any = [
    {
        name: 'Search',
        linkTo: '/search',
        icon: 'search'
    },
    {
        name: 'Favorite shows',
        linkTo: '/favorite-shows',
        icon: 'star'
    }
  ];

}
