import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBackupEmailComponent } from './edit-backup-email.component';

describe('EditBackupEmailComponent', () => {
  let component: EditBackupEmailComponent;
  let fixture: ComponentFixture<EditBackupEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBackupEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBackupEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
