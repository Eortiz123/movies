import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageConfirmsPeliculaComponent } from './message-confirms-pelicula.component';

describe('MessageConfirmsPeliculaComponent', () => {
  let component: MessageConfirmsPeliculaComponent;
  let fixture: ComponentFixture<MessageConfirmsPeliculaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageConfirmsPeliculaComponent]
    });
    fixture = TestBed.createComponent(MessageConfirmsPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
