import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LikesService } from '../core/services/likes.service';
import { TvMazeApiService } from '../core/services/tv-maze-api.service';
import {MatTable} from '@angular/material/table';
import { ShowModel } from '../shared/model/show-model';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent implements OnInit, OnDestroy {

  constructor(private getApi: TvMazeApiService, private getLikes: LikesService, private snackBar: MatSnackBar) { }

  @ViewChild(MatTable) table: MatTable<ShowModel> | undefined;
  tvShowNames: ShowModel[] = [];
  displayedColumns = ['title', 'thumbnail', 'likeUnlike', 'info'];
  private subscription = new Subscription();
  private allLikes: number[] = [];

  ngOnInit(): void {
    this.subscription.add(this.getLikes.getLikes().subscribe(
      (data: number[]) => {
        data.forEach((element: any) => {
          this.allLikes.push(element.id);
        });
      }
    ));
  }


  onKeySearch(event: any): void {
    this.tvShowNames  = [];
    this.table?.renderRows(); 
    this.subscription.add(this.getApi.getAllShows(event.target.value).subscribe(
      (data: ShowModel[]) => {
        data.forEach((element: any) => {
          this.tvShowNames.push(element);
          this.table?.renderRows(); 
          if (event.target.value === '') {
            this.tvShowNames = [];
            this.table?.renderRows(); 
          }
        });

      }));
  }

  openLikeSnackBar() {
    this.snackBar.open('Show Liked!', 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: "like-dialog",
    });
  }

  openDislikeSnackBar() {
    this.snackBar.open('Show Disliked!', 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: "dislike-dialog",
    });
  }

  likeShow(id: number): void {
    this.subscription.add(this.getLikes.addLike(id).subscribe(
      {
        next: () => {
          this.allLikes.push(id);
          this.openLikeSnackBar()
        },
        error: error => {
          console.error('There was an error!', error);
        }
      }));
  }

  checkLike(id: number): boolean {
    return this.allLikes.includes(id);
  }

  dislikeShow(id: number): void {
    this.subscription.add(this.getLikes.removeLike(id).subscribe((data: any) => {
      var index = this.allLikes.indexOf(id);
          if (index > -1) {
            this.allLikes.splice(index, 1);
            this.openDislikeSnackBar()
          }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
