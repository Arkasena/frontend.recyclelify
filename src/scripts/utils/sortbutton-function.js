function sortbutton(button) {
  button.addEventListener('click', () => {
    let sortby;
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    if (currentUrl.has('nameOrder')) {
      if (currentUrl.get('nameOrder') === 'asc') {
        sortby = 'desc';
        currentUrl.set('nameOrder', sortby);
      } else if (currentUrl.get('nameOrder') === 'desc') {
        sortby = 'asc';
        currentUrl.set('nameOrder', sortby);
      }
    } else {
      sortby = 'asc';
      currentUrl.append('nameOrder', sortby);
    }
    if (currentUrl.has('nameOrder')) {
      currentUrl.set('nameOrder', sortby);
    } else {
      currentUrl.append('nameOrder', sortby);
    }
    const urlParams = currentUrl.toString();
    window.location.href = `${(window.location.hash).split('?')[0]}?${urlParams.replace(/\+/g, ' ')}`;
  });
}
export default sortbutton;
