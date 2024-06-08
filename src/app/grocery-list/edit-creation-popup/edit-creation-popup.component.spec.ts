import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreationPopupComponent } from './edit-creation-popup.component';

describe('EditCreationPopupComponent', () => {
  let component: EditCreationPopupComponent;
  let fixture: ComponentFixture<EditCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCreationPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
