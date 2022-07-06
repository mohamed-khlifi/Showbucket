import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShowModel } from 'src/app/shared/model/show-model';

@Injectable({
  providedIn: 'root'
})
export class TvMazeApiService {

  constructor(private http: HttpClient) {
  }

  private api = environment.showbucketBackendUrl;
  show: ShowModel | undefined;

  getAllShows(query: any) {
    const fullurl = `${this.api}search/shows?q=:${query}`
    return this.http.get<any>(fullurl);
  }

  getShow(query: any) {
    const fullurl = `${this.api}shows/${query}`
    return this.http.get<any>(fullurl);
  }

}
