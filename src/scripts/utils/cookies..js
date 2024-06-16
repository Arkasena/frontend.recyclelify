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

  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },

  setUserAuth(token, userId, userRole, hours) {
    const userAuth = JSON.stringify({ token, userId, userRole });
    this.setCookie('userAuth', userAuth, hours);
  },

  getToken() {
    const userAuth = this.getCookie('userAuth');
    if (userAuth) {
      const { token } = JSON.parse(userAuth);
      return token;
    }
    return null;
  },

  getUserId() {
    const userAuth = this.getCookie('userAuth');
    if (userAuth) {
      const { userId } = JSON.parse(userAuth);
      return userId;
    }
    return null;
  },

  getRole() {
    const userAuth = this.getCookie('userAuth');
    if (userAuth) {
      const { userRole } = JSON.parse(userAuth);
      return userRole;
    }
    return null;
  },
};

export default Cookies;
