import Cookies from './cookies.';

const Auth = {
  isLogin() {
    return new Promise((resolve, reject) => {
      const token = Cookies.getCookie('authToken');
      if (!token) {
        const alert = document.createElement('error-alert');
        alert.alertData = {
          header: 'Akses Ditolak',
          desc: 'Anda belum Login, silahkan Login terlebih dahulu',
          button: 'Login',
          link: '#/login',
        };
        document.querySelector('main').append(alert);
        reject(new Error('Not logged in'));
      } else {
        resolve();
      }
    });
  },
};
export default Auth;
