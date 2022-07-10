import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LikesService } from '../core/services/likes.service';
import { TvMazeApiService } from '../core/services/tv-maze-api.service';
import { MatTable } from '@angular/material/table';
import { ShowModel } from '../shared/model/show-model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './favorite-shows-view.component.html',
  styleUrls: ['./favorite-shows-view.component.sass']
})
export class FavoriteShowsViewComponent implements OnInit, OnDestroy {

  constructor(private getLikes: LikesService, private getApi: TvMazeApiService, private snackBar: MatSnackBar) { }
  @ViewChild(MatTable) table: MatTable<ShowModel> | undefined;
  likedshows: ShowModel[] = [];
  displayedColumns = ['title', 'thumbnail', 'unlike'];
  private subscription = new Subscription();
  private allLikes: number[] = [];
  
  ngOnInit(): void {
    this.refresh();
  }

  openDislikeSnackBar() {
    this.snackBar.open('Show Disliked!', 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: "dislike-dialog",
    });
  }

  dislikeShow(id: any): void {
    this.subscription.add(this.getLikes.removeLike(id).subscribe((data: number[]) => {
      this.openDislikeSnackBar();
      this.refresh();
    }));
  }

  refresh(): void {
    this.allLikes = [];
    this.likedshows = [];
    this.subscription.add(this.getLikes.getLikes().subscribe(
      (data: number[]) => {
        data.forEach((element: any) => {
          this.allLikes.push(element.id);
        });
        this.allLikes.forEach((element: any) => {
          this.getApi.getShow(element).subscribe(
            (data: any) => {
              this.likedshows.push(data);
              this.table?.renderRows();
            }
          )

        });
      }
    ))
  }
  onKeySearch(event: any): void {

    if (event.target.value === '') {
      this.refresh();
    } else {
      this.likedshows = [];
      this.subscription.add(this.getApi.getAllShows(event.target.value).subscribe(
        (data: ShowModel[]) => {
          data.forEach((element: any) => {

            if (this.allLikes.includes(element.show.id)) {

              this.likedshows.push(element.show);
              this.table?.renderRows();
            }
          });

        }))
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
