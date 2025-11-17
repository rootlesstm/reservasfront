import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';
import { ReservasformularioComponent } from '../reservasformulario/reservasformulario.component';
import { CreateroomComponent } from '../createroom/createroom.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, CalendarioComponent, ReservasformularioComponent, FormsModule, CreateroomComponent],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    salas: any[] = [];
    reservas: any[] = [];
    salaSeleccionada = '';
    selectedRoomId: number | null = null;
    //private apiUrl = "http://localhost:8080";
    private apiUrl = "http://35.184.178.249";

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.loadReservas();

        this.http.get<any[]>(this.apiUrl + '/api/rooms').subscribe({
            next: (data) => {
                this.salas = data;
            },
            error: (err) => {
                console.error('Error al cargar salas:', err);
            }
        });
    }

    loadReservas(roomId?: number) {
        let url = '/api/bookings';
        if (roomId) {
            url += `/${roomId}`;
        }

        this.http.get<any[]>(this.apiUrl + url).subscribe(data => {
            this.reservas = data;
        });
    }

    onRoomChange(event: any) {
        const roomId = +event.target.value;
        this.selectedRoomId = roomId;
        this.loadReservas(roomId);
    }

}


