import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { Payment, Filter } from "./payment";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [PaymentService]
})


export class PaymentComponent implements OnInit {

  errorMessage: string;
  selectedMethodValue: string;
  selectedMethod: string;
  amount: number;
  selectedCurrency: string;
  selectedStatus: string;
  merchant: string;
  public data: Payment[];
  public filterQuery = "";
  public rowsOnPage = 20;
  public sortBy = "amount";
  public sortOrder = "desc";


  methods = [
    {value: 'ideal', displayName: 'IDeal'},
    {value: 'creditcard', displayName: 'Credit Card'},
    {value: 'bank-transfer', displayName: 'Bank Transfer'}
  ];

  currency = [
    {value: 'EUR', displayName: 'EUR'},
    {value: 'USD', displayName: 'USD'},
    {value: 'GBP', displayName: 'GBP'}
  ];

  status = [
    {value: 'accepted', displayName: 'Accepted'},
    {value: 'denied', displayName: 'Denied'},
  ];

  constructor(private _paymentService: PaymentService) { }


  callback() {
    let cb = (function(data) { this.data = data; }).bind(this);
     this._paymentService.getPaymentData(null, 'amount', 'DESC', 20, cb);
  }

  promise() {
    this._paymentService.getPaymentData( [new Filter('merchant','Ginger')] )
      .then(response => this.data = response)
      .catch(error => this.errorMessage = <any>error);
  }

  filterPayments() {
    this._paymentService.getPaymentData( [new Filter('method',this.selectedMethodValue)] )
      .then(response => this.data = response)
      .catch(error => this.errorMessage = <any>error);
  }

  addPayment() {
    let payment = new Payment();
    payment.amount = this.amount*100;
    payment.method = this.selectedMethod;
    payment.status = this.selectedStatus;
    payment.currency = this.selectedCurrency;
    payment.merchant = this.merchant;
    payment.created = Date.now().toString();

    //uses Observable
    this._paymentService.addPaymentData(payment).subscribe(
      (data) => console.log(data)
    );
  }

  ngOnInit() {

  }

}
