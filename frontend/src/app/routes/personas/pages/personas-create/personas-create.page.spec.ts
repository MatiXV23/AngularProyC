import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasCreatePage } from './personas-create.page';

describe('PersonasCreatePage', () => {
  let component: PersonasCreatePage;
  let fixture: ComponentFixture<PersonasCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonasCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
