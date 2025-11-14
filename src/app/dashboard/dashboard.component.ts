import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';
import { ReservasformularioComponent } from '../reservasformulario/reservasformulario.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, CalendarioComponent, ReservasformularioComponent, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    salas: any[] = [];
    salaSeleccionada = '';
    //private apiUrl = "http://localhost:8080";
    private apiUrl = "http://35.184.178.249/api";

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any[]>(this.apiUrl + '/api/rooms').subscribe({
            next: (data) => {
                this.salas = data;
            },
            error: (err) => {
                console.error('Error al cargar salas:', err);
            }
        });
    }

}


