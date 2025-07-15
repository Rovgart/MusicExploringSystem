import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  getSongs(
    sort: string = '',
    order: 'asc' | 'desc' = 'asc',
    page: number,
    pageSize: number = 8
  ): Observable<any> {
    return this.http.get(`${this.baseUrl}/songs`, {
      params: {
        sort,
        order,
        page,
        pageLimit: pageSize,
      },
    });
  }
  searchSongs(searchTerms: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/songs/`, {
      params: {
        searchTerm: searchTerms,
      },
    });
  }
  get_song(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/song/${id}`);
  }
}
