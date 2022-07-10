import { Component, OnInit } from '@angular/core';
import { NavItemsModel } from 'src/app/shared/model/nav-items-model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  navItems?: NavItemsModel[] = [
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
