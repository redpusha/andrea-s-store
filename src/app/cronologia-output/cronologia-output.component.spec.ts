import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronologiaOutputComponent } from './cronologia-output.component';

describe('CronologiaOutputComponent', () => {
  let component: CronologiaOutputComponent;
  let fixture: ComponentFixture<CronologiaOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronologiaOutputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronologiaOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
