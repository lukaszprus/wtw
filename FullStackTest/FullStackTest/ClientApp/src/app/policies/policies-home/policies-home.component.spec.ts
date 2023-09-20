import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesHomeComponent } from './policies-home.component';

xdescribe('TODO: PoliciesHomeComponent', () => {
  let component: PoliciesHomeComponent;
  let fixture: ComponentFixture<PoliciesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
