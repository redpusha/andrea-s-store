import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelevisoriComponent } from './televisori.component';

describe('TelevisoriComponent', () => {
  let component: TelevisoriComponent;
  let fixture: ComponentFixture<TelevisoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelevisoriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelevisoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
