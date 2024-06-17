import Cookies from './cookies.';

const Auth = {
  isLogin() {
    return new Promise((resolve, reject) => {
      const token = Cookies.getCookie('userAuth');
      if (!token) {
        window.location.hash = '#/login';
        setTimeout(() => {
          const alert = document.createElement('error-alert');
          alert.alertData = {
            header: '<span class="text-red-400">Akses Ditolak!</span>',
            desc: 'Anda belum Login, silahkan Login terlebih dahulu',
            button: 'Tutup',
            link: null,
          };
          // const existingAlert = document.querySelector('error-alert');
          // if (existingAlert) {
          //   existingAlert.remove();
          // }
          document.querySelector('main').append(alert);
        }, 0);
        reject(new Error('Not logged in'));
      } else {
        resolve();
      }
    });
  },
};
export default Auth;
