import { LoveAdminPage } from './app.po';

describe('love-admin App', () => {
  let page: LoveAdminPage;

  beforeEach(() => {
    page = new LoveAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
