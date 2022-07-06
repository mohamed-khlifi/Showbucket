import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';
import { DetailsViewComponent } from './details-view/details-view.component';
import { FavoriteShowsViewComponent } from './favorite-shows-view/favorite-shows-view.component';
import { SearchViewComponent } from './search-view/search-view.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchViewComponent
  },
  {path: '',
  redirectTo: 'search',
  pathMatch: 'full'
},
  {
    path: 'detail/:id',
    component: DetailsViewComponent
  },
  {
    path: 'favorite-shows',
    component: FavoriteShowsViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
