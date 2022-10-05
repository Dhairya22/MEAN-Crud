import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeCreateComponent } from './youtube-create.component';

describe('YoutubeCreateComponent', () => {
  let component: YoutubeCreateComponent;
  let fixture: ComponentFixture<YoutubeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
