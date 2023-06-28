import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePeliculaComponent } from './remove-pelicula.component';

describe('RemovePeliculaComponent', () => {
  let component: RemovePeliculaComponent;
  let fixture: ComponentFixture<RemovePeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemovePeliculaComponent]
    });
    fixture = TestBed.createComponent(RemovePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
