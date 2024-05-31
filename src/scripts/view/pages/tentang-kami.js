import { setLayoutDefault } from '../templates/template-creator';

const tentangKami = {
  async render() {
    return `
    <section class="w-full flex justify-center">
            <div class="w-full max-w-[1500px] h-80 flex flex-col gap-6 items-center justify-center px-6">
                <h1 class="text-4xl font-bold text-lime-700">Recyclelify</h1>
                <p class="text-xl text-lime-700 text-center">Jual beli sampah plastik, dukung lingkungan yang lebih bersih dan hijau.</p>
            </div>
        </section>
        <section class="w-full flex justify-center bg-lime-50">
            <div class="w-full max-w-[1500px] h-80 flex flex-col gap-6 justify-center px-6 relative">
                <div class="h-[109px] w-auto absolute top-[-55px] left-[-54px]"><img src="./images/others/circle-dot.svg" alt="Decoration"></div>
                <h1 class="text-4xl font-semibold">INDONESIA KRISIS SAMPAH</h1>
                <p class="text-xl">Indonesia menghadapi krisis sampah plastik yang semakin parah. Pada tahun 2023, tercatat timbunan sampah mencapai lebih dari 17,6 ton, dengan 32,6% sampah yang tidak dikelola. Jenis sampah terbanyak adalah plastik, yang menyumbang 18,3% dari total timbunan sampah. Pemerintah telah menetapkan target untuk mengurangi sampah plastik sebesar 30% pada tahun 2025 dan mengelola 70% dari total timbunan sampah. Lalu, bagaimana solusinya?</p>
            </div>
        </section>
        <section class="w-full flex justify-center">
            <div class="w-full max-w-[1500px] flex flex-col justify-center px-6">
                <div class="py-16 text-4xl font-semibold text-center">MISI RECYCLELIFY</div>
                <div class="px-10 h-[367px] py-8 flex flex-row bg-gray-50 justify-center gap-16 rounded-3xl mb-4">
                    <div class="flex justify-center items-center w-full max-w-[341px]"><img src="./images/others/sarana-bagi-mitra.svg" alt="Sarana bagi mitra svg"></div>
                    <div class="flex flex-col justify-center gap-6">
                        <h2 class="text-2xl font-semibold">Sarana bagi Mitra</h2>
                        <p class="">Recyclelify hadir sebagai marketplace yang memudahkan transaksi jual beli sampah plastik. Dengan menghubungkan pengumpul sampah dengan mitra pelaku daur ulang sampah plastik, kami memastikan bahwa sampah plastik mendapatkan kehidupan kedua dan tidak berakhir di tempat pembuangan akhir.</p>
                    </div>
                </div>
                <div class="px-10 h-[367px] py-8 flex flex-row bg-gray-50 justify-center gap-16 rounded-3xl mb-4">
                    <div class="flex flex-col justify-center gap-6">
                        <h2 class="text-2xl font-semibold text-right">Melacak Jejak Positif</h2>
                        <p class="text-right">Dengan sistem pelacakan dan monitoring kami, Anda dapat melihat sejauh mana kontribusi Anda dalam mengurangi sampah plastik. Setiap transaksi yang Anda lakukan di Recycleify adalah langkah nyata menuju Bumi yang lebih bersih</p>
                    </div>
                    <div class="flex justify-center items-center w-full max-w-[341px]"><img src="./images/others/melacak-jejak-positif.svg" alt="Sarana bagi mitra svg"></div>
                </div>
                <div class="px-10 py-8 h-[367px] flex flex-row bg-gray-50 justify-center gap-16 rounded-3xl mb-4">
                    <div class="flex justify-center items-center w-full max-w-[341px]"><img src="./images/others/media-edukasi.svg" alt="Sarana bagi mitra svg"></div>
                    <div class="flex flex-col justify-center gap-6">
                        <h2 class="text-2xl font-semibold">Media Edukasi</h2>
                        <p class="">Kami berkomitmen untuk meningkatkan kesadaran masyarakat tentang pentingnya daur ulang. Melalui konten edukatif seperti artikel, video, dan webinar, kami ingin menginspirasi dan membekali masyarakat dengan pengetahuan yang mereka butuhkan untuk berpartisipasi dalam upaya pengelolaan sampah plastik.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full flex justify-center bg-lime-700 h-[738px] mt-16">
            <div class="w-full max-w-[1500px] flex flex-col justify-center items-center px-6 gap-16">
                <h2 class="text-4xl font-bold text-white">DIBALIK RECYCLELIFY</h2>
                <div class="flex flex-row gap-20">
                    <div class="flex flex-col gap-9 justify-center items-center">
                        <div class="w-[209px] aspect-square rounded-full bg-gray-100"></div>
                        <div class="flex flex-col gap-4">
                            <h3 class="text-white text-xl font-semibold text-center">Nama</h3>
                            <p class="text-white text-xl text-center">Role</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-9 justify-center items-center">
                        <div class="w-[209px] aspect-square rounded-full bg-gray-100"></div>
                        <div class="flex flex-col gap-4">
                            <h3 class="text-white text-xl font-semibold text-center">Nama</h3>
                            <p class="text-white text-xl text-center">Role</p>
                        </div>
                    </div>
                    <div class="flex flex-col gap-9 justify-center items-center">
                        <div class="w-[209px] aspect-square rounded-full bg-gray-100"></div>
                        <div class="flex flex-col gap-4">
                            <h3 class="text-white text-xl font-semibold text-center">Nama</h3>
                            <p class="text-white text-xl text-center">Role</p>
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

export default tentangKami;
// page bakal buat halaman baru