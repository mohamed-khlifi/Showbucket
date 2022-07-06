import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { DetailsViewComponent } from './details-view/details-view.component';
import { FormsModule } from '@angular/forms';
import { FavoriteShowsViewComponent } from './favorite-shows-view/favorite-shows-view.component';
import { SidenavComponent } from './core/components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchViewComponent,
    DetailsViewComponent,
    FavoriteShowsViewComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
