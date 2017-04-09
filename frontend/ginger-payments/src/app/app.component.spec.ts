import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { PaymentComponent } from './payment/payment.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './data-filter.pipe';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        HttpModule,
        DataTableModule
      ],
      declarations: [
        AppComponent,
        PaymentComponent,
        DataFilterPipe
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
