import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectList1Component } from './project-list1.component';

describe('ProjectList1Component', () => {
  let component: ProjectList1Component;
  let fixture: ComponentFixture<ProjectList1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectList1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
