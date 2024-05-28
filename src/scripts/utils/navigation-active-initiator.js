const NavigationActiveInitiator = {
  init({ navigationElement }) {
    navigationElement.forEach((navigationItem) => {
      this._isActiveChecker(navigationItem);
    });
  },
  _isActiveChecker(navigationItem) {
    let pages = (window.location.hash).split('/');
    pages = `${pages[0]}/${pages[1]}`;
    pages = pages.split('?')[0].toString();
    console.log(pages);
    if (navigationItem.getAttribute('href') === pages) {
      const li = navigationItem.querySelector('li');
      li.classList.add('text-lime-600', 'font-bold');
      li.classList.remove('font-medium');
    } else {
      const li = navigationItem.querySelector('li');
      li.classList.remove('text-lime-600', 'font-bold');
      li.classList.add('font-medium');
    }
  },
};
export default NavigationActiveInitiator;
