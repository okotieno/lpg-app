import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TransporterToDepotConfirmationPage } from './transporter-to-depot-confirmation.page';


describe('AssignOrderPage', () => {
  let component: TransporterToDepotConfirmationPage;
  let fixture: ComponentFixture<TransporterToDepotConfirmationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporterToDepotConfirmationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransporterToDepotConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
