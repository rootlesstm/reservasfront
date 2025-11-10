import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendario',
    imports: [CommonModule],
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {

    @Input() salas: string[] = [];
    horas = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);
    reservas: any[] = [];
    private apiUrl = "http://localhost:8080";
    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.http.get<any[]>(this.apiUrl + '/api/bookings').subscribe(data => {
            this.reservas = data;
        });
    }

    isOcupado(sala: string, hora: string): boolean {
        return this.reservas.some(r => r.sala === sala && r.horaInicio === hora);
    }
}
