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
  NavigationActiveInitiator.init({ navigationElement: document.querySelectorAll('ul#navigation a') });
});

window.addEventListener('load', () => {
  app.renderPage();
  NavigationActiveInitiator.init({ navigationElement: document.querySelectorAll('ul#navigation a') });
});
