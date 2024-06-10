import { loginPagesTemplateCreator, setLayoutNothing } from '../../templates/template-creator';

const login = {
  async render() {
    return loginPagesTemplateCreator();
  },

  async afterRender() {
    setLayoutNothing();
    const section = document.querySelector('section');
    section.innerHTML = `<form-login class="flex-1 p-24 h-full bg-white flex flex-col justify-center items-center rounded-r-[52px]"></form-login>
    <login-img class="hidden lg:flex"></login-img>`;
  },
};

export default login;
