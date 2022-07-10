import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from '../core/services/likes.service';
import { TvMazeApiService } from '../core/services/tv-maze-api.service';
import {MatTable} from '@angular/material/table';
import { ShowModel } from '../shared/model/show-model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.sass']
})



export class DetailsViewComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,private getApi: TvMazeApiService, private getLikes : LikesService, private snackBar: MatSnackBar) { }
  @ViewChild(MatTable) table: MatTable<ShowModel> | undefined;
  show : ShowModel[] = [];
  unliked = false;
  displayedColumns = ['name', 'language', 'genre', 'status', 'streamingService', 'tvNetwork', 'likeUnlike'];
  displayedColumnsWithoutStreamingService = ['name', 'language', 'genre', 'status', 'tvNetwork', 'likeUnlike'];
  displayedColumnsWithoutTvNetwork = ['name', 'language', 'genre', 'status', 'streamingService', 'likeUnlike'];
  private id:  string | any;
  private allLikes: number[] = [];
  private subscription = new Subscription();

  getDisplayedColumns(): string[]
  {
    if(!this.show[0]?.network?.id)
    {
      return this.displayedColumnsWithoutTvNetwork;
    }
    if(!this.show[0]?.webChannel?.id)
    {
      return this.displayedColumnsWithoutStreamingService;
    }
    
      return this.displayedColumns;

  }


  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id'); 
    
    this.subscription.add(this.getApi.getShow(this.id).subscribe(
      (data: any) => {
        this.show.push(data);
        this.table?.renderRows();   
      }));
      


      this.subscription.add(this.getLikes.getLikes().subscribe(
        (data: number[]) => {
          data.forEach((element: any) => {
            this.allLikes.push(element.id);
          });
          if (this.allLikes.includes(parseInt(this.id))) {
            this.unliked = true;
          }
        }
      ))
  }

  openLikeSnackBar() {
    this.snackBar.open('Show Liked!', 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: "like-dialog",
    });
  }

  openUnlikeSnackBar() {
    this.snackBar.open('Show Unliked!', 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: "unlike-dialog",
    });
  }


  likeUnlike(): void {
    if (this.unliked == false) {
      this.subscription.add(this.getLikes.removeLike(parseInt(this.id)).subscribe(
        () => {
          this.openUnlikeSnackBar();
        }
      ))
    } else {
      this.subscription.add(this.getLikes.addLike(parseInt(this.id)).subscribe(
        (data: number[]) => {
          this.openLikeSnackBar();
        }
      ))
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
