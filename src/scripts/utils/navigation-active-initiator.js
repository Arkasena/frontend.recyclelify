const NavigationActiveInitiator = {
  init() {
    if (window.location.hash) {
      let pages = (window.location.hash).split('/');
      pages = `${pages[0]}/${pages[1]}`;
      pages = pages.split('?')[0].toString();
      if (pages === '#/collaborator' || pages === '#/partner') {
        pages = window.location.hash;
      }
      console.log(pages);
      document.querySelector('header').setAttribute('active', pages);
    } else if (`${window.location.origin}/` === window.location.href) {
      document.querySelector('header').setAttribute('active', '/');
    }
  },

};
export default NavigationActiveInitiator;
