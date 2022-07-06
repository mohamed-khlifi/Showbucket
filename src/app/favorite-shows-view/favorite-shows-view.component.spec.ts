import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteShowsViewComponent } from './favorite-shows-view.component';

describe('FavoriteShowsViewComponent', () => {
  let component: FavoriteShowsViewComponent;
  let fixture: ComponentFixture<FavoriteShowsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteShowsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteShowsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
