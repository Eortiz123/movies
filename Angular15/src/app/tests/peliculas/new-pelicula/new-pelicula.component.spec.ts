import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPeliculaComponent } from './new-pelicula.component';

describe('NewPeliculaComponent', () => {
  let component: NewPeliculaComponent;
  let fixture: ComponentFixture<NewPeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPeliculaComponent]
    });
    fixture = TestBed.createComponent(NewPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
