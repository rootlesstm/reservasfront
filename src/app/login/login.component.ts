import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(""),
        password: new FormControl("")
    });

    constructor(

        private router: Router,
        private auth: AuthService
    ) { }

    http = inject(HttpClient);

    onLogin() {
        const formValue = this.loginForm.value;

        this.auth.login(formValue).subscribe({
            next: (response: any) => {
                if (response) {
                    if (response.token) {
                        localStorage.setItem("token", response.token);
                        localStorage.setItem("user_id", response.user.id);
                    }
                    this.router.navigate(['/dashboard']);
                } else {
                    alert(response.message);
                }

            },
            error: (error: any) => {
                console.log("Error: " + error.message);
                alert(error.message);
            }
        })

    }


}
