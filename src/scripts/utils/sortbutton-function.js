function sortbutton(button) {
  button.addEventListener('click', () => {
    let sortby;
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    if (currentUrl.has('sortBy')) {
      if (currentUrl.get('sortBy') === 'ascending') {
        sortby = 'descending';
        currentUrl.set('sortBy', sortby);
      } else if (currentUrl.get('sortBy') === 'descending') {
        sortby = 'ascending';
        currentUrl.set('sortBy', sortby);
      }
    } else {
      sortby = 'ascending';
      currentUrl.append('sortBy', sortby);
    }
    if (currentUrl.has('sortBy')) {
      currentUrl.set('sortBy', sortby);
    } else {
      currentUrl.append('sortBy', sortby);
    }
    const urlParams = currentUrl.toString();
    window.location.href = `${(window.location.hash).split('?')[0]}?${urlParams.replace(/\+/g, ' ')}`;
  });
}
export default sortbutton;
