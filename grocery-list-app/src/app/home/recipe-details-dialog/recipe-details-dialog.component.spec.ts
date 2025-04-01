import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsDialogComponent } from './recipe-details-dialog.component';

describe('RecipeDetailsDialogComponent', () => {
  let component: RecipeDetailsDialogComponent;
  let fixture: ComponentFixture<RecipeDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
