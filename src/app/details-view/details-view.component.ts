import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LikesService } from '../core/services/likes.service';
import { TvMazeApiService } from '../core/services/tv-maze-api.service';
import {MatTable} from '@angular/material/table';
import { ShowModel } from '../shared/model/show-model';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.sass']
})



export class DetailsViewComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,private getApi: TvMazeApiService, private getLikes : LikesService) { }
  @ViewChild(MatTable) table: MatTable<ShowModel> | undefined;
  show : ShowModel[] = [];
  liked = false;
  displayedColumns = ['name', 'language', 'genre', 'status', 'streamingService', 'tvNetwork', 'likeDislike'];
  displayedColumnsWithoutStreamingService = ['name', 'language', 'genre', 'status', 'tvNetwork', 'likeDislike'];
  displayedColumnsWithoutTvNetwork = ['name', 'language', 'genre', 'status', 'streamingService', 'likeDislike'];
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
      (data: ShowModel) => {
        this.show.push(data);
        this.table?.renderRows();   
      }));
      


      this.subscription.add(this.getLikes.getLikes().subscribe(
        (data: number[]) => {
          data.forEach((element: any) => {
            this.allLikes.push(element.id);
          });
          if (this.allLikes.includes(parseInt(this.id))) {
            this.liked = true;
          }
        }
      ))

      

  }
  likeDislike(): void {
    if (this.liked == false) {
      this.subscription.add(this.getLikes.removeLike(parseInt(this.id)).subscribe(
        (data: number[]) => {
          console.log(data);
        }
      ))
    } else {
      this.subscription.add(this.getLikes.addLike(parseInt(this.id)).subscribe(
        (data: number[]) => {
          console.log(data);
        }
      ))
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

}
