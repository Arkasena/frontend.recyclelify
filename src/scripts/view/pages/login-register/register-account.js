import API_ENDPOINT from '../../../global/api-endpoint';
import UrlParser from '../../../routes/url-parser';
import Cookies from '../../../utils/cookies.';
import { loginPagesTemplateCreator, setLayoutNothing } from '../../templates/template-creator';

const registerAccount = {
  async render() {
    return loginPagesTemplateCreator();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const role = url.resource.split('=')[1];
    if (role !== 'collaborator' && role !== 'partner') {
      window.location.href = '#/register';
    }
    setLayoutNothing();
    const section = document.querySelector('section');
    section.innerHTML = `<form-daftar-akun class="flex-1 p-24 h-full bg-white flex flex-col justify-center items-center rounded-r-[52px]"></form-daftar-akun>
    <login-img></login-img>`;
    // submit function
    const form = document.querySelector('#form-create-acc');
    // to next page
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      section.innerHTML = '';
      const formProfile = document.createElement('form-daftar-user-profile');
      const imgLogin = document.createElement('login-img');
      const formData = {
        role: window.location.hash,
        email: form.elements.email.value,
        username: form.elements.username.value,
        password: form.elements.password.value,
      };
      section.append(formProfile, imgLogin);
      const formEl = document.querySelector('#form-user-profile');
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          role: role.toUpperCase(),
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: formEl.elements.name.value,
          phoneNumber: `+62${formEl.elements.telepon.value}`,
          address: `${formEl.elements.alamat.value}+${formEl.elements.kota.value}+${formEl.elements.provinsi.value}`,
        };
        console.log(data);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        document.querySelector('main').innerHTML += `
        <div id="loading" class="top-0 right-0 fixed z-[999] flex justify-center items-center w-full h-full bg-opacity-40 bg-black">
            <div class="loading z-[999]"></div>
        </div>`;
        fetch(API_ENDPOINT.REGISTER, options)
          .then((response) => response.json())
          .then((result) => {
            if (result.error) {
              document.querySelector('#loading').remove();
              const alert = document.createElement('error-alert');
              alert.alertData = {
                header: 'Login gagal',
                desc: 'Email atau Password tidak ditemukan',
                button: 'Tutup',
                link: null,
              };
              document.querySelector('main').append(alert);
            } else {
              const { token, user } = result.data;
              Cookies.setUserAuth(token, user.id, user.role, 1);
              window.location.href = '#/';
              setTimeout(() => {
                const alert = document.createElement('custom-alert');
                alert.alertData = {
                  header: 'Berhasil Login',
                  desc: 'Mari berkontribusi untuk lingkungan lebih bersih, bersama Recyclelify',
                  button: 'Cari Mitra',
                  link: '#/find-partner',
                };
                document.querySelector('main').append(alert);
              }, 0);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    });
  },
};

export default registerAccount;
