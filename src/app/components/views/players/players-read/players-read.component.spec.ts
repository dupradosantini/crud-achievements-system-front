import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersReadComponent } from './players-read.component';

describe('PlayersReadComponent', () => {
  let component: PlayersReadComponent;
  let fixture: ComponentFixture<PlayersReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
