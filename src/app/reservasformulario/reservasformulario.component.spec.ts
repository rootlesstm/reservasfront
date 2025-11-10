import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasformularioComponent } from './reservasformulario.component';

describe('ReservasformularioComponent', () => {
  let component: ReservasformularioComponent;
  let fixture: ComponentFixture<ReservasformularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasformularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
