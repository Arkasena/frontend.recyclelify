import { setLayoutDashboard } from '../templates/template-creator';

const dashboard = {
  async render() {
    return `
    
          `;
  },

  async afterRender() {
    setLayoutDashboard(); // set header, main, footer ke layout dashboard;
    // pastiin di index.html ada atribut is='app-...'
  },
};

export default dashboard;
// page bakal buat halaman baru
