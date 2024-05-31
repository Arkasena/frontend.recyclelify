import { loginPagesTemplateCreator } from '../templates/template-creator';

const login = {
  async render() {
    return loginPagesTemplateCreator();
  },

  async afterRender() {
    const section = document.querySelector('section');
    section.innerHTML = `<form-login class="flex-1 p-24 h-full bg-white flex flex-col justify-center items-center rounded-r-[52px]"></form-login>
    <login-img></login-img>`;
    const header = document.querySelector('header');
    header.setAttribute('layout', 'nothing');
  },
};

export default login;
