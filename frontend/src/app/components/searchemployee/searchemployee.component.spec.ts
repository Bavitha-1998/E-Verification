import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchemployeeComponent } from './searchemployee.component';

describe('SearchemployeeComponent', () => {
  let component: SearchemployeeComponent;
  let fixture: ComponentFixture<SearchemployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchemployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
