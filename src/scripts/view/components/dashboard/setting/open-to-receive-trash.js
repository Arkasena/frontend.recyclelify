/* eslint-disable class-methods-use-this */
class OpenToReceiveTrash extends HTMLElement {
  constructor() {
    super();
    this._trashData = {
      startDate: null,
      endDate: null,
      peteMin: null,
      peteMax: null,
      petePrice: null,
      hdpeMin: null,
      hdpeMax: null,
      hdpePrice: null,
      pvcMin: null,
      pvcMax: null,
      pvcPrice: null,
      ldpeMin: null,
      ldpeMax: null,
      ldpePrice: null,
      ppMin: null,
      ppMax: null,
      ppPrice: null,
      psMin: null,
      psMax: null,
      psPrice: null,
      peteChecked: null,
      hdpeChecked: null,
      pvcChecked: null,
      ldpeChecked: null,
      ppChecked: null,
      psChecked: null,
    };
  }

  connectedCallback() {
    this.render();
    this.formSubmit();
    this.checkboxFunction();
    this.toggleFunction();
  }

  toggleFunction() {
    const toggles = this.querySelectorAll('input[name="toggle"]');
    toggles.forEach((toggle) => {
      toggle.addEventListener('change', () => {
        const label = toggle.nextElementSibling;
        if (toggle.checked) {
          label.classList.add('bg-lime-700');
          label.classList.remove('bg-gray-300');
        } else {
          label.classList.add('bg-gray-300');
          label.classList.remove('bg-lime-700');
        }
      });
    });
  }

  checkboxFunction() {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    checkbox.forEach((element) => {
      element.addEventListener('click', () => {
        const parentLabel = element.closest('label');
        const grandparentElement = parentLabel.parentElement;
        const allInput = grandparentElement.querySelectorAll('input[type="number"]');
        if (element.checked) {
          allInput.forEach((inputElement) => {
            inputElement.setAttribute('required', '');
            const inputEvents = ['click', 'input', 'change', 'invalid', 'blur'];
            inputEvents.forEach((eventType) => {
              inputElement.addEventListener(eventType, () => {
                inputElement.setCustomValidity('');
                if (inputElement.validity.valueMissing) {
                  inputElement.setCustomValidity('Bagian ini tidak boleh kosong.');
                }
              });
            });
          });
        } else {
          allInput.forEach((inputElement) => {
            inputElement.removeAttribute('required');
          });
        }
      });
    });
  }

  formSubmit() {
    const form = document.getElementById('receiveForm');
    const plasticTypes = ['PETE', 'HDPE', 'PVC', 'LDPE', 'PP', 'PS'];

    function updateRequiredAttributes(type) {
      const minimal = document.getElementById(`${type}minimal`);
      const maksimal = document.getElementById(`${type}maximal`);
      const harga = document.getElementById(`${type}harga`);

      const isAnyFilled = minimal.value.trim() || maksimal.value.trim() || harga.value.trim();

      if (isAnyFilled) {
        minimal.required = true;
        maksimal.required = true;
        harga.required = true;
      } else {
        minimal.required = false;
        maksimal.required = false;
        harga.required = false;
      }
    }

    plasticTypes.forEach((type) => {
      const minimalInput = document.getElementById(`${type}minimal`);
      const maksimalInput = document.getElementById(`${type}maximal`);
      const hargaInput = document.getElementById(`${type}harga`);

      minimalInput.addEventListener('input', () => updateRequiredAttributes(type));
      maksimalInput.addEventListener('input', () => updateRequiredAttributes(type));
      hargaInput.addEventListener('input', () => updateRequiredAttributes(type));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelectorAll('input[type="number"]');
      const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
      const arrayCheckbox = [];
      const arrayData = {};
      input.forEach((inputElement) => {
        const name = inputElement.getAttribute('name');
        arrayData[name] = form.elements[name].value;
      });
      inputCheckbox.forEach((checkbox) => {
        const name = checkbox.getAttribute('value');
        const value = checkbox.checked;
        arrayCheckbox.push({ name, accept: value });
      });
      // Fungsi untuk mengelompokkan data dan menghapus entri yang tidak diperlukan
      function groupAndFilterData(initialData, materials) {
        return materials.map((material) => {
          const { name } = material;
          const minimum = initialData[`${name.toUpperCase()}minimal`] || '';
          const maximum = initialData[`${name.toUpperCase()}maximal`] || '';
          const price = initialData[`${name.toUpperCase()}harga`] || '';
          // Return null for entries that have accept=false and all values are empty
          if (!material.accept && !minimum && !maximum && !price) {
            return null;
          }
          return {
            name,
            accept: material.accept,
            minimumTransactionWeight: minimum,
            maximumTransactionWeight: maximum,
            pricePerKilogram: price,
          };
        }).filter((entry) => entry !== null); // Remove null entries
      }

      // Hasil pengelompokan dan penyaringan
      const groupedFilteredData = groupAndFilterData(arrayData, arrayCheckbox);

      // Menampilkan hasil
      console.log(groupedFilteredData);
    });
  }

  set trashData(value) {
    this._trashData = value;
    this.render();
    this.formSubmit();
    this.checkboxFunction();
    this.toggleFunction();
  }

  get trashData() {
    return this._trashData;
  }

  render() {
    this.innerHTML = `
    <div id="open-to-recieve-trash-setting" class="flex flex-col gap-4">
            <form id="receiveForm" class="flex flex-col gap-4">
                <h3 class="font-semibold">Jenis Sampah Plastik</h3>
                <div class="flex flex-col justify-between">
                    <div class="grid grid-cols-12 gap-4 justify-between">
                        <label for="PETE" class="text-base px-2 py-2 flex flex-row items-center col-start-1 col-end-3">
                            <input type="checkbox" name="plasticType" id="PETE" value="PETE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PETE
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="PETEMinimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Minimal<input type="number" min=0 id="PETEminimal" name="PETEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PETEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="PETEmaximal" name="PETEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PETEHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="PETEharga" name="PETEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 justify-between">
                        <label for="HDPE" class="text-base px-2 py-2 flex flex-row items-center col-start-1 col-end-3">
                            <input type="checkbox" name="plasticType" id="HDPE" value="HDPE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">HDPE
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="HDPEmminimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Minimal<input type="number" min=0 id="HDPEminimal" name="HDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="HDPEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="HDPEmaximal" name="HDPEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="HDPEHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="HDPEharga" name="HDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 justify-between gap-4">
                        <label for="PVC" class="text-base px-2 py-2 flex flex-row items-center col-start-1 col-end-3">
                            <input type="checkbox" name="plasticType" id="PVC" value="PVC" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PVC
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="PVCminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" min=0 id="PVCminimal" name="PVCminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PVCMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="PVCmaximal" name="PVCmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PVCHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="PVCharga" name="PVCharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 justify-between">
                        <label for="LDPE" class="text-base px-2 py-2 flex flex-row items-center">
                            <input type="checkbox" name="plasticType" id="LDPE" value="LDPE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">LDPE
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="LDPEminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" min=0 id="LDPEminimal" name="LDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="LDPEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="LDPEmaximal" name="LDPEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="LDPEHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="LDPEharga" name="LDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 justify-between">
                        <label for="PP" class="text-base px-2 py-2 flex flex-row items-center">
                            <input type="checkbox" name="plasticType" id="PP" value="PP" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PP
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="PPminimal" class="text-base px-2 py-2 flex flex-row items-center">
                            Minimal<input type="number" min=0 id="PPminimal" name="PPminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PPMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="PPmaximal" name="PPmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PPHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="PPharga" name="PPharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 gap-4 justify-between">
                        <label for="PS" class="text-base px-2 py-2 flex flex-row items-center">
                            <input type="checkbox" name="plasticType" id="PS" value="PS" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PS
                        </label>
                        <div class="grid grid-cols-3 col-start-3 col-end-12">
                          <label for="PSminimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Minimal<input type="number" min=0 id="PSminimal" name="PSminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PSMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
                              Maksimal<input type="number" min=0 id="PSmaximal" name="PSmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
                          </label>
                          <label for="PSHarga" class="text-base px-2 py-2 flex flex-row items-center">
                              Harga<input type="number" min=0 id="PSharga" name="PSharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 invalid:border invalid:border-red-500   relative  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
                          </label>
                        </div>
                        <div class="col-start-12 col-end-13 relative inline-block w-16 mr-2 align-middle self-center justify-self-end select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-8 h-8 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-transform transform duration-200 ease-in-out">
                          <label for="toggle" class="toggle-label block overflow-hidden h-8 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                    </div>
                </div>
                <div class="place-self-end">
                    <button type="submit" class="bg-lime-600 text-gray-50 rounded-xl px-4 py-3">Simpan Perubahan</button>
                </div>
            </form>
        </div>
    `;
  }
}

customElements.define('open-to-receive-trash', OpenToReceiveTrash);
