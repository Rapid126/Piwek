import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/api/posts').pipe(
      map(posts => posts.map(post => ({ ...post, id: post._id })))
    );
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(this.url + '/api/post/' + id).pipe(
      map(post => ({ ...post, id: post._id }))
    );
  }

  addPost(post: any): Observable<any> {
    return this.http.post(this.url + '/api/post', post);
  }

  // DODANO METODĘ UPDATE
  updatePost(id: string, post: any): Observable<any> {
    return this.http.put(this.url + '/api/post/' + id, post);
  }

  // DODANO METODĘ DELETE
  deletePost(id: string): Observable<any> {
    return this.http.delete(this.url + '/api/post/' + id);
  }
}