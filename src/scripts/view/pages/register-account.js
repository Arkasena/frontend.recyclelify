import { loginPagesTemplateCreator, setLayoutNothing } from '../templates/template-creator';

const registerAccount = {
  async render() {
    return loginPagesTemplateCreator();
  },

  async afterRender() {
    setLayoutNothing();
    const section = document.querySelector('section');
    section.innerHTML = `<form-daftar-akun class="flex-1 p-24 h-full bg-white flex flex-col justify-center items-center rounded-r-[52px]"></form-daftar-akun>
    <login-img></login-img>`;
    // submit function
    const form = document.querySelector('#form-create-acc');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      section.innerHTML = '';
      const formProfile = document.createElement('form-daftar-user-profile');
      const imgLogin = document.createElement('login-img');
      formProfile.classList.add('flex-1', 'p-24', 'h-full', 'bg-white', 'flex', 'flex-col', 'justify-center', 'items-center', 'rounded-r-[52px]');
      formProfile.formData = {
        role: 'mitra',
        email: form.elements.email.value,
        password: form.elements.password.value,
        placeholder: 'PT. Bersih Hijau',
      };
      section.append(formProfile, imgLogin);
      const formEl = document.querySelector('#form-user-profile');
      formEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          role: formEl.elements.role.value,
          email: formEl.elements.email.value,
          password: formEl.elements.password.value,
          name: formEl.elements.name.value,
          telepon: formEl.elements.telepon.value,
          alamat: formEl.elements.alamat.value,
        };
        console.log(data);
        window.location.href = `${window.location.origin}/#/login`;
      });
    });
  },
};

export default registerAccount;
