import 'regenerator-runtime';
import '../styles/output.css';
import App from './view/app';
import './view/components';
import NavigationActiveInitiator from './utils/navigation-active-initiator';

const app = new App({
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  window.scrollTo(0, 0);
  NavigationActiveInitiator.init();
});

window.addEventListener('load', () => {
  app.renderPage();
  NavigationActiveInitiator.init();
});
