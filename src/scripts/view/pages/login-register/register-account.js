import API_ENDPOINT from '../../../global/api-endpoint';
import UrlParser from '../../../routes/url-parser';
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
        fetch(API_ENDPOINT.PARTNER, options)
          .then((response) => response.json())
          .then((result) => {
        window.location.href = `${window.location.origin}/#/login`;
            console.log(result);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    });
  },
};

export default registerAccount;
