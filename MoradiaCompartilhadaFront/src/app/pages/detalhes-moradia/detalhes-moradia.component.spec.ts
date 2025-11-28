import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMoradiaComponent } from './detalhes-moradia.component';

describe('DetalhesMoradiaComponent', () => {
  let component: DetalhesMoradiaComponent;
  let fixture: ComponentFixture<DetalhesMoradiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalhesMoradiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesMoradiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
