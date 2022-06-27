import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesAchievementsComponent } from './games-achievements.component';

describe('GamesAchievementsComponent', () => {
  let component: GamesAchievementsComponent;
  let fixture: ComponentFixture<GamesAchievementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesAchievementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesAchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
