import { BankAppPage } from './app.po';

describe('bank-app App', () => {
  let page: BankAppPage;

  beforeEach(() => {
    page = new BankAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
