const Cookies = {
  setCookie(name, value, hours) {
    let expires = '';
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  },

  // // Contoh penggunaan
  // const token = 'your_bearer_token_here';
  // setCookie('authToken', token, 5); // Token disimpan selama 5 jam
  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  // Contoh penggunaan
  // const savedToken = getCookie('authToken');
  // console.log(savedToken); // Menampilkan token yang disimpan
  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
export default Cookies;
