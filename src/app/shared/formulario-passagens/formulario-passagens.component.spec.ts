import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPassagensComponent } from './formulario-passagens.component';

describe('FormularioPassagensComponent', () => {
  let component: FormularioPassagensComponent;
  let fixture: ComponentFixture<FormularioPassagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPassagensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPassagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
