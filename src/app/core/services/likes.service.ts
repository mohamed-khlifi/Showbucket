import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }

  private api = environment.jsonServerUrl;

  allLikes: number[] = [];

  addLike(id: any) {
    let url = this.api + 'likes';
    return this.http.post<any>(url, { id: id });
  }

  getLikes() {
    const fullurl = `${this.api}likes`
    return this.http.get<any>(fullurl);
  }

  removeLike(id: any) {
    const fullurl = `${this.api}likes/${id}`
    return this.http.delete<any>(fullurl);
  }

}
