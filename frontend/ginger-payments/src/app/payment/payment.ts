export class Payment {
  id: number;
  method: string;
  amount: number;
  currency: string;
  created: string;
  status: string;
  merchant: string;
}

export class Filter {
  key: string;
  value: string;

  constructor(k, v) {
    this.key = k;
    this.value = v;
  }
}
