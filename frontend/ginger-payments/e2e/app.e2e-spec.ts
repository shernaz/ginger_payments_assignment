import { GingerPaymentsPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('ginger-payments App', () => {
  let page: GingerPaymentsPage;

  beforeEach(() => {
    page = new GingerPaymentsPage();
  });

  it('callback button brings 20 payments', () => {
    page.navigateTo();

    let button = element(by.css('#btn-callback'));
    button.click();

    let payments = element.all(by.css(".data-row"));

    //making sure there are no more pages
    expect(element.all(by.css('.page-item')).count()).toEqual(0);

    //also lets double check based on #rows per page
    expect(payments.count()).toEqual(20);
  });

  it('promise button brings all Ginger payments', () => {
    page.navigateTo();

    let button = element(by.css('#btn-promise'));
    button.click();

    let payments = element.all(by.css(".data-row"));

    payments.count().then(function (count) {
      for(let i = 0; i < count; i++) {
        let payment_element = payments.get(i);

        let td = payment_element.element(by.css('#payment_merchant_id'));

        expect(td.getText()).toEqual("Ginger");

        // payment_element.getText().then(function (item_txt) {
        //   expect(item_txt)
        //   console.log(item_txt);
        // });
      }

    });





  });

});
