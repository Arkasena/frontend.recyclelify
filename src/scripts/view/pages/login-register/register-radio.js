import { loginPagesTemplateCreator, setLayoutNothing } from '../../templates/template-creator';

const registerRadio = {
  async render() {
    return loginPagesTemplateCreator();
  },

  async afterRender() {
    setLayoutNothing();
    const section = document.querySelector('section');
    section.innerHTML = `<form-daftar-radio class="flex-1 p-24 h-full bg-white flex flex-col justify-center items-center rounded-r-[52px]"></form-daftar-radio>
    <login-img></login-img>`;
  },
};

export default registerRadio;
