import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEditarAssociadoComponent } from './criar-editar-associado.component';

describe('CriarEditarAssociadoComponent', () => {
  let component: CriarEditarAssociadoComponent;
  let fixture: ComponentFixture<CriarEditarAssociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarEditarAssociadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarEditarAssociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
