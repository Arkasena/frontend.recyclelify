import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  constructor({ button, drawer, content }) {
    // this._button = button;
    // this._drawer = drawer;
    this._content = content;
    // this._initialAppShell();
  }

  // _initialAppShell() {
  //   DrawerInitiator.init({
  //     button: this._button,
  //     drawer: this._drawer,
  //     content: this._content,
  //   });
  // }

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
