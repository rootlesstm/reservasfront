import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-reservasformulario',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './reservasformulario.component.html',
    styleUrl: './reservasformulario.component.css'
})
export class ReservasformularioComponent {
    @Input() salas: any[] = [];

    reservaForm: FormGroup;
    //private apiUrl = "http://localhost:8080";
    private apiUrl = "http://35.184.178.249";

    constructor(private fb: FormBuilder, private http: HttpClient) {
        this.reservaForm = this.fb.group({
            room_id: ['', Validators.required],
            created_at: ['', Validators.required],
            start_time: ['', Validators.required],
            end_time: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        // this.http.get<any[]>(this.apiUrl + '/api/rooms').subscribe({
        //     next: (data) => {
        //         this.salas = data;
        //     },
        //     error: (err) => {
        //         if (err.status === 422) {
        //             console.error('Errores del backend:', err.error.errors);
        //         }
        //         console.error('Error al cargar salas:', err);
        //     }
        // });
    }

    Reserver() {
        if (this.reservaForm.valid) {
            const form = this.reservaForm.value;
            const start = `${form.created_at} ${form.start_time}:00`; // → '2025-11-12 10:00:00'
            const end = `${form.created_at} ${form.end_time}:00`;
            const user_id = Number(localStorage.getItem('user_id'));
            const payload = {
                room_id: Number(this.reservaForm.value.room_id),
                user_id: user_id,
                created_at: `${form.created_at} 00:00:00`, // o new Date().toISOString() si prefieres
                start_time: start,
                end_time: end

            };
            console.log('Payload enviado:', payload);

            this.http.post(this.apiUrl + '/api/bookings', payload).subscribe({
                next: () => { alert('Reserva creada'); window.location.reload(); },
                error: (err) => {
                    alert('Error: ' + err.message);

                },
            });
        }
    }

    onSubmit() {
        this.Reserver();
    }
}
