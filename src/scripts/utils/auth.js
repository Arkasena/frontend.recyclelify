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
          document.querySelector('main').append(alert);
        }, 0);
        reject();
      } else {
        resolve();
      }
    });
  },
  isNotLogin() {
    return new Promise((resolve, reject) => {
      const token = Cookies.getCookie('userAuth');
      if (token) {
        window.location.hash = '#/';
        setTimeout(() => {
          const alert = document.createElement('error-alert');
          alert.alertData = {
            header: 'Aksi Gagal!',
            desc: 'Anda sudah Login, Tidak dapat <span class="text-red-400">Login/Register</span> kembali.',
            button: 'Tutup',
            link: null,
          };
          document.querySelector('main').append(alert);
        }, 0);
        reject();
      } else {
        resolve();
      }
    });
  },
  isPartner() {
    if (Cookies.getRole() !== 'PARTNER') {
      window.location.href = `#/${Cookies.getRole().toLowerCase()}/dashboard`;
    }
  },
  isCollaborator() {
    if (Cookies.getRole() !== 'COLLABORATOR') {
      window.location.href = `#/${Cookies.getRole().toLowerCase()}/dashboard`;
    }
  },
};
export default Auth;
