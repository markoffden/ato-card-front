import { AtoCardFrontPage } from './app.po';

describe('ato-card-front App', () => {
  let page: AtoCardFrontPage;

  beforeEach(() => {
    page = new AtoCardFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
