import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevistasListaComponent } from './previstas-lista.component';

describe('PrevistasListaComponent', () => {
  let component: PrevistasListaComponent;
  let fixture: ComponentFixture<PrevistasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevistasListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevistasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});