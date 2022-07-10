import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }

  private api = environment.jsonServerUrl;

  allLikes: number[] = [];

  addLike(id: number): Observable<number[]> {
    let url = this.api + 'likes';
    return this.http.post<number[]>(url, { id: id });
  }

  getLikes(): Observable<number[]> {
    const fullurl = `${this.api}likes`
    return this.http.get<number[]>(fullurl);
  }

  removeLike(id: number): Observable<number[]> {
    const fullurl = `${this.api}likes/${id}`
    return this.http.delete<number[]>(fullurl);
  }

}
