import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTareaDialogComponent } from './crear-tarea-dialog.component';

describe('CrearTareaDialogComponent', () => {
  let component: CrearTareaDialogComponent;
  let fixture: ComponentFixture<CrearTareaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTareaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTareaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
