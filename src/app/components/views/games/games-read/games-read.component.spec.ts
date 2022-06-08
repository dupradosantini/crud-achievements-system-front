import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesReadComponent } from './games-read.component';

describe('GamesReadComponent', () => {
  let component: GamesReadComponent;
  let fixture: ComponentFixture<GamesReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
