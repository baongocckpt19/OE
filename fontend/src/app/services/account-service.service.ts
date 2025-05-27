import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userInfoSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  userInfo$ = this.userInfoSubject.asObservable();
  constructor(private http: HttpClient) { }

  // ✅ Sửa setUser() dùng localStorage thay vì sessionStorage
  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userInfoSubject.next(user);
  }

  // ✅ getCurrentUser cũng dùng localStorage
  getCurrentUser(): any {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }


  getUserId(): number | null {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return null;

    try {
      const user = JSON.parse(userJson);
      return user?.user_id ?? null;
    } catch (e) {
      return null;
    }
  }
  getStudentsByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/students/role/${role}`);
  }

  login(model: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/login', model).pipe(
      map(response => {
        if (response && response.user) {
          // ✅ Lưu user vào localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.setUser(response.user); // Nếu bạn có method này thì giữ lại
        }
        console.log('Login successful:', this.userInfo$);
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    // redirect hoặc cập nhật trạng thái user
  }
  register(model: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/auth/register', model);
}

}
