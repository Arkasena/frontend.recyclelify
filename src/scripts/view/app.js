import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    console.log(url);
    let page = routes[url];
    if (!page) {
      page = routes['/404'];
    }
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}
export default App;
