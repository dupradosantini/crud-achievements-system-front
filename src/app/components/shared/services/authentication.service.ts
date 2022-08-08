import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`
    ${environment.baseUrl}/login`,
     { username, password },
     { observe: "response"})
     .pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let token = user.headers.get("Authorization")!;
      let loggedInUser = new User(username,token);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      this.currentUserSubject.next(loggedInUser);
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    console.log("trying to log out");
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    location.reload();
  }

  //set name user new in storage
  setUserName(username:string){
    localStorage.setItem('username', JSON.stringify(username));
  }

  getUserName(){
    return JSON.parse(localStorage.getItem('username') || '{}');
  }
}
