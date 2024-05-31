import { setLayoutDefault } from '../templates/template-creator';

const bantuan = {
  async render() {
    return `
    <section class="w-full flex justify-center bg-lime-50">
            <div class="w-full max-w-[1500px] h-80 flex flex-col gap-6 items-center justify-center px-6">
                <h1 class="text-2xl font-semibold text-center">Selalu ada untuk membantu kamu!</h1>
                <p class= "text-center">Punya pertanyaan seputar jual beli sampah plastik? Jangan ragu untuk bertanya langsung melalui form di bawah ini</p>
            </div>
        </section>
        <section class="w-full flex justify-center" id="bantuanContainer">
        </section>
          `;
  },

  async afterRender() {
    setLayoutDefault();
    const formBantuan = document.createElement('form-bantuan');
    document.querySelector('#bantuanContainer').append(formBantuan);
  },
};

export default bantuan;
// page bakal buat halaman baru
