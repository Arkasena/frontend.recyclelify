/* eslint-disable eqeqeq */
class Pagination extends HTMLElement {
  constructor() {
    super();
    this._dataPages = {
      totalPage: null,
      curentPage: null,
    };
  }

  connectedCallback() {
    this.render();
    this._createPages(this.dataPages.curentPage);
    this._nextButtonFunction();
    this._prevButtonFunction();
  }

  set dataPages(value) {
    this._dataPages = value;
    this.render();
  }

  get dataPages() {
    return this._dataPages;
  }

  _emptyContent() {
    this.innerHTML = '';
  }

  _nextButtonFunction() {
    document.querySelector('#nextButton').addEventListener('click', () => {
      if (this.dataPages.curentPage < this.dataPages.totalPage) {
        this._createPages(this.dataPages.curentPage + 1);
      }
    });
  }

  _prevButtonFunction() {
    document.querySelector('#prevButton').addEventListener('click', () => {
      if (this.dataPages.curentPage < this.dataPages.totalPage) {
        this._createPages(this.dataPages.curentPage - 1);
      }
    });
  }

  _createPages(page) {
    this.dataPages.curentPage = page;
    const ul = document.querySelector('#pagUl');
    ul.innerHTML = '';
    let beforePage = this.dataPages.curentPage - 2;
    let afterPage = this.dataPages.curentPage + 2;
    if (this.dataPages.curentPage == 2) {
      beforePage = this.dataPages.curentPage - 1;
    }
    if (this.dataPages.curentPage == 1) {
      beforePage = this.dataPages.curentPage;
    }
    if (this.dataPages.curentPage == this.dataPages.totalPage - 1) {
      afterPage = this.dataPages.curentPage + 1;
    }
    if (this.dataPages.curentPage == this.dataPages.totalPage) {
      afterPage = this.dataPages.curentPage;
    }
    for (let i = beforePage; i <= afterPage; i += 1) {
      if (this.dataPages.curentPage == i) {
        const liItem = document.createElement('li');
        liItem.innerHTML = i;
        liItem.classList.add('inline-flex', 'justify-center', 'items-center', 'my-0', 'mx-3', 'w-9', 'h-9', 'rounded-lg', 'text-center', 'font-medium', 'leading-[45px]', 'cursor-pointer', 'bg-lime-700', 'text-white');
        liItem.addEventListener('click', () => { this._createPages(i); });
        ul.append(liItem);
      } else {
        const liItem = document.createElement('li');
        liItem.innerHTML = i;
        liItem.classList.add('inline-flex', 'justify-center', 'items-center', 'my-0', 'mx-3', 'bg-gray-100', 'w-9', 'h-9', 'rounded-lg', 'text-center', 'font-medium', 'leading-[45px]', 'cursor-pointer');
        liItem.addEventListener('click', () => { this._createPages(i); });
        ul.append(liItem);
      }
    }

    const prev = document.querySelector('#prevButton');
    const next = document.querySelector('#nextButton');

    if (this.dataPages.curentPage <= 1) {
      prev.classList.remove('flex');
      prev.classList.add('hidden');
    } else {
      prev.classList.add('flex');
      prev.classList.remove('hidden');
    }
    if (this.dataPages.curentPage >= this.dataPages.totalPage) {
      next.classList.remove('flex');
      next.classList.add('hidden');
    } else {
      next.classList.add('flex');
      next.classList.remove('hidden');
    }
    const currentUrl = new URLSearchParams((window.location.href).split('?')[1]);
    let urlParams;
    if (currentUrl.has('page')) {
      currentUrl.set('page', (this.dataPages.curentPage).toString());
      urlParams = currentUrl.toString();
      window.location.href = `${(window.location.hash).split('?')[0]}?${urlParams.replace(/\+/g, ' ')}`;
    } else if (page.toString() !== '1') {
      currentUrl.append('page', page);
      urlParams = currentUrl.toString();
      window.location.href = `${(window.location.hash).split('?')[0]}?${urlParams.replace(/\+/g, ' ')}`;
    }
  }

  render() {
    this._emptyContent();
    this.classList.add('flex', 'item-center', 'justify-center', 'w-full');
    this.innerHTML += `
    <div class="w-max flex items-center bg-transparent py-2 px-10 rounded-md">
        <button id="prevButton" class="inline-flex items-center w-9 h-9 justify-center text-lg font-medium rounded-lg bg-gray-100 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></button>
        <ul id="pagUl" class="my-5 mx-7">
            
        </ul>
        <button id="nextButton" class="inline-flex items-center w-9 h-9  justify-center text-lg font-medium rounded-lg bg-gray-100 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></button>
    </div> 
      `;
  }
}
customElements.define('pagination-bar', Pagination);
