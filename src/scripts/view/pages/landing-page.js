import { setLayoutDefault } from '../templates/template-creator';

const landingPage = {
  async render() {
    return `
    <section class="w-full flex justify-center">
            <div class="w-full max-w-[1500px] flex flex-col gap-6 justify-center relative px-6">
                <div class="flex flex-col gap-8 w-full max-w-[551px] pt-10 md:pt-32 pb-16 z-10">
                    <h1 class="text-4xl font-bold">Langkah Kecil untuk Perubahan Besar</h1>
                    <p class="text-xl">Platform revolusioner yang mengubah cara Anda melihat sampah plastik. Gabung sekarang dan jadilah bagian dari solusi untuk masa depan yang bersih dan hijau!</p>
                    <div class="flex flex-row gap-3">
                        <a href="#/register"><button class="text-lime-600 border border-lime-600 px-10 py-2 rounded-xl">Daftar</button></a>
                        <a href="#/login"><button class="text-white bg-lime-600 px-10 py-2 rounded-xl">Masuk</button></a>
                    </div>
                </div>
                <div class="flex justify-center items-center absolute bottom-0 right-0">
                    <img src="./images/others/landing-top.svg" alt="">
                </div>
            </div>
        </section>
        <section class="w-full flex justify-center py-20 relative">
            <div class="absolute w-[70px] left-0 top-0"><img src="./images/others/square-dot.svg" alt=""></div>
            <div class="absolute w-[70px] right-0 bottom-[-36px] md:bottom-[-56px] rotate-180"><img src="./images/others/square-dot.svg" alt=""></div>
            <div class="w-full max-w-[1500px] flex flex-col gap-20 justify-center items-center px-6">
                <h2 class="text-4xl font-bold">Layanan Kami</h2>
                <div class="flex flex-col gap-8 lg:flex-row lg:gap:12">
                    <div class="py-16 px-8 flex flex-col gap-6 bg-lime-50 rounded-2xl">
                        <h2 class="text-2xl font-semibold text-center">Kolaborator</h2>
                        <p class="text-center">Kumpulkan dan jual sampah plastik kepada mitra. Dapatkan keuntungan dari setiap sampah plastik yang Anda kumpulkan.</p>
                    </div>
                    <div class="py-16 px-8 flex flex-col gap-6 bg-lime-50 rounded-2xl">
                        <h2 class="text-2xl font-semibold text-center">Mitra</h2>
                        <p class="text-center"> Bergabunglah dengan jaringan kami dan jadilah bagian dari gerakan menuju keberlanjutan dengan membeli sampah plastik berkualitas tinggi untuk didaur ulang.</p>
                    </div>
                    <div class="py-16 px-8 flex flex-col gap-6 bg-lime-50 rounded-2xl">
                        <h2 class="text-2xl font-semibold text-center">Statistik</h2>
                        <p class="text-center">Pantau dan rasakan dampak positif yang Anda ciptakan dengan melihat statistik kontribusi Anda dalam mengurangi sampah plastik.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full flex justify-center mt-10 mb-20">
            <div class="w-full max-w-[1500px] flex flex-col gap-20 justify-center items-center relative px-6">
                <h2 class="text-4xl font-bold text-center">Ketahui Jenis Sampah Plastik Disekitarmu</h2>
                <div class="grid md:grid-cols-2 gap-[30px]">
                    <div class="p-8 flex flex-row gap-6 bg-yellow-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/PETE.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">POLYETHYLENE TEREPHTHALATE</h2>
                            <p class="text-sm">Jenis plastik sekali pakai dengan tingkat bahaya dan kesulitan terurai yang tergolong sedang. Sifatnya ringat, kurat, transparan.</p>
                        </div>
                    </div>
                    <div class="p-8 flex flex-row gap-6 bg-green-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/LDPE.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">LOW DENSY POLYETHYLENE</h2>
                            <p class="text-sm">Jenis plastik berstandar food grade. LDPE sangat mudah didaur ulang sekaligus cocok untuk kemasan makanan karena kuat dan fleksibel. Meskipun tingkat bahayanya rendah, jenis plastik ini memiliki tingkat kesulitan penguraian yang tergolong sedang</p>
                        </div>
                    </div>
                    <div class="p-8 flex flex-row gap-6 bg-orange-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/HDPE.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">HIGH DENSY POLYETHYLENE</h2>
                            <p class="text-sm">Jenis plastik sekali pakai dengan tingkat bahaya dan kesulitan terurai yang tergolong sedang.  Bersifat kuat, tahan suhu lembap, dan tahan dengan bahan kimia.</p>
                        </div>
                    </div>
                    <div class="p-8 flex flex-row gap-6 bg-sky-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/PP.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">POLYPROPYLENE</h2>
                            <p class="text-sm">Jenis plastik yang tahan panas dibanding jenis plastik yang lain. Contoh produk plastik PP adalah sedotan, tutup botol, hingga tempat makanan panas. Jenis plastik ini sangat sulit terurai.</p>
                        </div>
                    </div>
                    <div class="p-8 flex flex-row gap-6 bg-red-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/PVC.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">POLYVINYL CHLORIDE</h2>
                            <p class="text-sm">Plastik dengan tingkat bahaya dan kesulitan terurai tinggi. Memiliki tekstur yang keras dan tahan cuaca Jika terkena material panas dapat membahayakan fungsi organ (ginjal, berat badan, & hati).</p>
                        </div>
                    </div>
                    <div class="p-8 flex flex-row gap-6 bg-purple-50 justify-center items-center rounded-2xl">
                        <img src="./images/others/PS.svg" alt="Polyethylene terephthalate">
                        <div class="flex flex-col gap-2">
                            <h2 class="font-semibold">POLYSTYRENE</h2>
                            <p class="text-sm">Jenis plastik dengan tingkat bahaya dan kesulitan terurai tinggi. Jika terbakar, dapat mengeluarkan gas beracun yang menghasilkan polusi udara. Jenis plastik ini merupakan bahan dasar styrofoam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          `;
  },

  async afterRender() {
    setLayoutDefault();
  },
};

export default landingPage;
// page bakal buat halaman baru
