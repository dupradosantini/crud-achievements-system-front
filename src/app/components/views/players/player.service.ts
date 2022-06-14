import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerPage } from './players.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findPlayerPage(pageNumber: Number, numberOfElements: Number): Observable<PlayerPage>{
    const url = `${this.baseUrl}/players?page=${pageNumber}&size=${numberOfElements}`;
    return this.http.get<PlayerPage>(url);
  }
}
