import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DispatchFromDealerPage } from './dispatch-from-dealer.page';

describe('DispatchFromDealerPage', () => {
  let component: DispatchFromDealerPage;
  let fixture: ComponentFixture<DispatchFromDealerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchFromDealerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DispatchFromDealerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
