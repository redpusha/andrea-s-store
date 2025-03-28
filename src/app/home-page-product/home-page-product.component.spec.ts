import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageProductComponent } from './home-page-product.component';

describe('HomePageProductComponent', () => {
  let component: HomePageProductComponent;
  let fixture: ComponentFixture<HomePageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
