import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

declare var bootstrap: any;


@Component({
    selector: 'app-createroom',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './createroom.component.html',
    styleUrl: './createroom.component.css'
})
export class CreateroomComponent {

    @Output() roomCreado = new EventEmitter<void>();
    //private apiUrl = 'http://localhost:8080';
    private apiUrl = "http://35.184.178.249";

    room = {
        name: '',
        capacity: null
    };

    constructor(private http: HttpClient) { }

    onSubmit() {
        this.http.post(this.apiUrl + '/api/rooms', this.room)
            .subscribe({
                next: (response) => {
                    alert('SALA CREADA CON EXTIO');
                    this.closeModal();
                },
                error: (err) => {

                    console.error('Error al crear salas:', err);
                }
            });
    }

    closeModal() {
        const modalEl = document.getElementById('crearReservaModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal?.hide();
        }
    }

}
