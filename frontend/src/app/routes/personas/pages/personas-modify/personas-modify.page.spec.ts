import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasModifyPage } from './personas-modify.page';

describe('PersonasModifyPage', () => {
  let component: PersonasModifyPage;
  let fixture: ComponentFixture<PersonasModifyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasModifyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
