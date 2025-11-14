import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //private apiUrl = "http://localhost:8080/api";
    private apiUrl = "http://35.184.178.249/api";

    constructor(
        private router: Router

    ) { }

    http = inject(HttpClient);

    login(credentials: { email: string; password: string }): Observable<any> {

        return this.http.post(this.apiUrl + "/login", credentials);

    }

    getCsrfToken(): Observable<any> {

        return this.http.get<{ token: any }>(this.apiUrl + '/csrf-token');

    }

    loginWithCsrf(credentials: { email: string; password: string }): Observable<any> {
        return this.getCsrfToken().pipe(
            switchMap(csrfToken => {
                const headers = new HttpHeaders({ 'X-CSRF-TOKEN': csrfToken.token });
                console.log(headers);

                return this.http.post(this.apiUrl + '/login', credentials, { headers });
            })
        );
    }



    logout() {
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

}
