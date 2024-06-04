function mainPages(containerName) {
  return `
    <section class="w-full flex flex-col items-center bg-slate-50 h-72" id="hero">
    </section>
    <section class="w-full py-8 flex justify-center">
        <div class="w-full max-w-[1500px] flex flex-row gap-8 px-4">
            <div class="flex flex-col gap-4" id="filterContainer">
            </div>
            <div class="flex flex-col w-full flex-1" id='contentContainer'>
                <div class="flex flex-row justify-between w-full items-center mb-8">
                    <h2 class="font-semibold text-lg" id="title">Seluruh Produk</h2>
                    <button id="sort" class="h-9 w-28 bg-zinc-100 items-center flex justify-evenly rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-up"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>Urutkan</button>
                </div>
                <div class="grid grid-cols-3 w-full gap-6" id="${containerName}">

                </div>
            </div>
        </div>
    </section>`;
}
function loginPagesTemplateCreator() {
  return `   
  <section class="flex w-full h-full flex-row items-center bg-lime-50">
    </section>`;
}
function setLayoutDashboard(userType) {
  let user;
  if (userType === 1) {
    user = 'collaborator';
  } else if (userType === 2) {
    user = 'partner';
  }
  const header = document.querySelector('header');
  header.userType = user;
  header.setAttribute('layout', 'dashboard');
  document.querySelector('main').setAttribute('layout', 'dashboard');
  document.querySelector('footer').setAttribute('layout', 'dashboard');
}
function setLayoutDefault() {
  document.querySelector('header').setAttribute('layout', 'default');
  document.querySelector('main').setAttribute('layout', 'default');
  document.querySelector('footer').setAttribute('layout', 'default');
}
function setLayoutNothing() {
  document.querySelector('header').setAttribute('layout', 'nothing');
  document.querySelector('main').setAttribute('layout', 'default');
  document.querySelector('footer').setAttribute('layout', 'nothing');
}
export {
  mainPages,
  loginPagesTemplateCreator,
  setLayoutDashboard,
  setLayoutDefault,
  setLayoutNothing,
};
