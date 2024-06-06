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
            inputElement.removeAttribute('disabled');
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
            inputElement.setAttribute('disabled', '');
          });
        }
      });
    });
  }

  formSubmit() {
    const form = document.querySelector('#receiveForm');
    const awal = form.querySelector('#startdate');
    const akhir = form.querySelector('#enddate');
    awal.addEventListener('click', () => {
      awal.showPicker();
    });
    akhir.addEventListener('click', () => {
      akhir.showPicker();
    });
    function customValidationEmptyHandler(event) {
      event.target.setCustomValidity('');
      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Bagian ini tidak boleh kosong.');
      }
    }
    function customMessage(event, element) {
      const isValid = event.target.validity.valid;
      const errorMessage = event.target.validationMessage;
      const connectedValidationEl = form.querySelector(`#${element}`);
      if (!event.target.value) {
        connectedValidationEl.innerText = errorMessage;
      }
      if (errorMessage && !isValid) {
        connectedValidationEl.innerText = errorMessage;
      } else {
        connectedValidationEl.innerText = '';
      }
    }
    const inputEvents = ['click', 'input', 'change', 'invalid', 'blur'];
    const inputForms = [awal, akhir];
    inputEvents.forEach((eventType) => {
      inputForms.forEach((input) => {
        input.addEventListener(eventType, customValidationEmptyHandler);
      });
      if (eventType !== 'click' && eventType !== 'change') {
        awal.addEventListener(eventType, (event) => { customMessage(event, 'startValidation'); });
        akhir.addEventListener(eventType, (event) => { customMessage(event, 'endValidation'); });
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.querySelectorAll('input[type="number"]');
      const textData = {};
      input.forEach((element) => {
        const name = element.getAttribute('name');
        textData[name] = form.elements[name].value;
      });
      console.log(textData);
      const formData = {
        startDate: form.elements.startdate.value,
        endDate: form.elements.enddate.value,
      };
      const transformObject = (obj) => {
        const result = [];
        Object.entries(obj).forEach(([key, value]) => {
          if (key === 'startDate' || key === 'endDate' || value === '') return;
          const material = key.match(/^[A-Z]+/)[0];
          const property = key.slice(material.length).toLowerCase();
          if (!result.find((item) => item.name === material)) {
            result.push({ name: material });
          }
          const materialObj = result.find((item) => item.name === material);
          switch (property) {
            case 'minimal':
              materialObj.minimumTransactionWeight = value;
              break;
            case 'maximal':
              materialObj.maximumTransactionWeight = value;
              break;
            case 'harga':
              materialObj.pricePerKilogram = value;
              break;
            default:
              break;
          }
        });
        return result;
      };
      const plasticType = transformObject(textData);
      console.log({ ...formData, plasticType });
    });
  }

  set trashData(value) {
    this._trashData = value;
    this.render();
    this.formSubmit();
    this.checkboxFunction();
  }

  get trashData() {
    return this._trashData;
  }

  render() {
    this.innerHTML = `
    <div id="open-to-recieve-trash-setting" class="flex flex-col gap-4">
    <form id="receiveForm" class="flex flex-col gap-4">
        <h3 class="font-semibold">Tanggal Penerimaan</h3>
        <div class="flex flex-row justify-between gap-8">
            <div class="flex flex-col pb-4 w-full">
                <label for="startdate" class="text-base font-medium py-2">Tanggal Mulai</label>
                <input aria-describedby="startValidation" class="rounded-lg outline-lime-600 invalid:outline-red-500 border-0 text-base w-full h-16 shadow-md px-3" type="date" name="startdate" id="startdate" placeholder="YYYY/MM/DD" required>
                <p id="startValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
            <div class="flex flex-col pb-4 w-full">
                <label for="enddate" class="font-medium text-base py-2">Tanggal Berakhir</label>
                <input aria-describedby="endValidation" class="rounded-lg outline-lime-600 invalid:outline-red-500 border-0 text-base w-full h-16 shadow-md px-3" type="date" name="enddate" id="enddate" placeholder="YYYY/MM/DD" required>
                <p id="endValidation" class="text-red-500 text-sm" aria-live="polite"></p>
            </div>
        </div>
        <h3 class="font-semibold">Jenis Sampah Plastik</h3>
        <div class="flex flex-col justify-between">
        <div class="grid grid-cols-4 justify-between">
        <label for="PETE" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="PETE" value="PETE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PETE
        </label>
        <label for="PETEMinimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="PETEminimal" name="PETEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PETEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="PETEmaximal" name="PETEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PETEHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="PETEharga" name="PETEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
    </div>
    <div class="grid grid-cols-4 justify-between">
        <label for="HDPE" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="HDPE" value="HDPE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">HDPE
        </label>
        <label for="HDPEmminimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="HDPEminimal" name="HDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="HDPEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="HDPEmaximal" name="HDPEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="HDPEHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="HDPEharga" name="HDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
    </div>
    <div class="grid grid-cols-4 justify-between">
        <label for="PVC" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="PVC" value="PVC" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PVC
        </label>
        <label for="PVCminimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="PVCminimal" name="PVCminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PVCMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="PVCmaximal" name="PVCmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PVCHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="PVCharga" name="PVCharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
    </div>
    <div class="grid grid-cols-4 justify-between">
        <label for="LDPE" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="LDPE" value="LDPE" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">LDPE
        </label>
        <label for="LDPEminimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="LDPEminimal" name="LDPEminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="LDPEMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="LDPEmaximal" name="LDPEmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="LDPEHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="LDPEharga" name="LDPEharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
    </div>
    <div class="grid grid-cols-4 justify-between">
        <label for="PP" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="PP" value="PP" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PP
        </label>
        <label for="PPminimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="PPminimal" name="PPminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PPMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="PPmaximal" name="PPmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PPHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="PPharga" name="PPharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
    </div>
    <div class="grid grid-cols-4 justify-between">
        <label for="PS" class="text-base px-2 py-2 flex flex-row items-center">
            <input type="checkbox" name="plasticType" id="PS" value="PS" class="mr-2 accent-lime-400 cursor-pointer w-4 h-4">PS
        </label>
        <label for="PSminimal" class="text-base px-2 py-2 flex flex-row items-center">
            Minimal<input type="number" disabled id="PSminimal" name="PSminimal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PSMaksimal" class="text-base px-2 py-2 flex flex-row items-center">
            Maksimal<input type="number" disabled id="PSmaximal" name="PSmaximal" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 mr-2 ml-4" placeholder="kg">
        </label>
        <label for="PSHarga" class="text-base px-2 py-2 flex flex-row items-center">
            Harga<input type="number" disabled id="PSharga" name="PSharga" class="rounded-lg outline-lime-600 invalid:outline-red-500 relative invalid:border invalid:border-red-500  text-base text-right w-full h-12 shadow-md px-3 ml-4" placeholder="Rp. ">
        </label>
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
