import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private userInfoSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('user') || 'null'));
  userInfo$ = this.userInfoSubject.asObservable();
  constructor(private http:HttpClient ) { }

  login(model: any): Observable<any>{
      return this.http.post<any>('http://localhost:8080/api/login', model).pipe(
      map(response => {
        if (response && response.user) {
          this.setUser(response.user);
        }
        return response;
      }
      ));
  }
  setUser( user: any) {
   
    sessionStorage.setItem('user', JSON.stringify(user));

    this.userInfoSubject.next(user);
  }
  
}
