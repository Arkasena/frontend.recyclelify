import { setLayoutNothing } from '../templates/template-creator';

const page404 = {
  async render() {
    return `
    <section class="w-full h-full flex justify-center items-center pb-10">
            <div class="flex flex-col w-[800px] items-center gap-6">
                <div class="w-[300px] flex justify-center=">
                    <img src="./images/others/not-found.svg" alt="">
                </div>
                <h1 class="text-8xl font-bold mt-[-90px] z-10 text-lime-600">404</h1>
                <div class="text-center text-3xl text-gray-800 font-semibold mb-2">Halaman yang dicari tidak ditemukan.</div>
                <a href="/"><button class="h-10 px-10 rounded-xl text-gray-50 bg-lime-600">Kembali ke Beranda</button></a>
            </div>
        </section>  
          `;
  },

  async afterRender() {
    setLayoutNothing();
  },
};

export default page404;
// page bakal buat halaman baru
