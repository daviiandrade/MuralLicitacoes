import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevistasComponent } from './previstas.component';

describe('PrevistasComponent', () => {
  let component: PrevistasComponent;
  let fixture: ComponentFixture<PrevistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});