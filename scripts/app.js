import { data } from '../data/data.js';
import { regions } from '../data/regions.js';

// variables
const inpRegion = document.querySelector('.js-select-region');
const inpTypeSchool = document.querySelector('.js-select-type-school');
const arParentSelectEl = document.querySelectorAll('.main__select-wrapper');
const selectElArr = document.querySelectorAll('.main__select');
const selectArrowArr = document.querySelectorAll('.btn-select');
const selectResetArr = document.querySelectorAll('.btn-select-reset');
const promptArr = document.querySelectorAll('.prompt-filter');
const btnApply = document.querySelector('.btn-apply-filter');
const searchInput = document.querySelectorAll('.input-search');
const btnSearchResetArr = document.querySelectorAll('.btn-reset-search');
const exportBtnEl = document.querySelector('.js-popup-export');
const popupExport = document.querySelector('.export');
const popupEdit = document.querySelector('.popup-edit');
const delBtnArr = document.querySelectorAll('.del-btn');
const popupDel = document.querySelector('.popup-delete');
const schoolIdEl = document.querySelector('.school-id');
const schoolFullNameEl = document.querySelector('.school-name');
const filtersWrapper = document.querySelector('.js-region-filters__wrapper');
const promptSearchArr = document.querySelectorAll('.prompt-search');
const btnTotalEl = document.querySelector('.js-btn-total');
const fieldInTotalEl = document.querySelector('.js-total-value');
const loopIconsArr = document.querySelectorAll('.search-table');
const tableSearchBtnReset = document.querySelectorAll('.table_desktop .btn-reset-search');
const btnAddAltEl = document.querySelector('.btn-add-alt');
const btnSaveEdit = document.querySelector('.btn-save');
const importBtnEl = document.querySelector('.js-popup-import');
const popupImport = document.querySelector('.import');
const btnRegionArr = document.querySelectorAll('.filter-region');
const checkboxTypeSchoolArr = document.querySelectorAll('.js-checkbox-school-type');
const inputArr = document.querySelectorAll('input');
const inpExportEl = document.querySelector('.input-export');
const exportButton = document.querySelector('.btn-download-export');
const selectOverlay = document.querySelector('.select_overlay');
const newAltWrapper = document.querySelector('.wrap-forms-edit');
const pFileName = document.querySelector('.filename');
const inpImportEl = document.querySelector('.input-import');

let inpFullName = document.querySelector('.edit-fullname');
let inpInn = document.querySelector('.edit-inn');
let oldValueSchoolSelect = [];
let regionValueInput = '';
let dataSlice = data.slice(0);
let editBtnArr = document.querySelectorAll('.edit-btn');
let scroll = JSON.parse(localStorage.getItem('pos'));
let count = 0;
let n = 0;
let countAddALtClick = 1;
let newALtNameFormHTML = '';
let idTrTable = '';
let dataFilters = [];
let i = 0;
let j = 0;
let arrFiltersType = [];
let arrSchoolTypeSelect = '';
let idInterval;

// Scroll position
window.addEventListener('scroll', () => {
  localStorage.setItem('pos', window.scrollY);
});
window.onload = () => {
  window.scrollTo({ top: scroll });
};
window.onresize = () => {
  if (popupEdit.style.display != 'none') {
    setHeightTextArae();
    setPositionForButtonsEdit();
  }
}

function checkUndef(prop) {
  if (prop === undefined) {
    return '';
  } else return prop;
}

// Экспорт данных из таблицы 
async function exportTableToExcel(fileName, tableSelector = '.table_desktop') {
  let table = document.querySelector(tableSelector),
    rows = table.querySelectorAll("tr");

  // Стартовая структура XML
  let excelFile = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
    <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]><xml>
        <x:ExcelWorkbook>
            <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                    <x:Name>Sheet1</x:Name>
                    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                </x:ExcelWorksheet>
            </x:ExcelWorksheets>
        </x:ExcelWorkbook>
        </xml><![endif]-->
    </head>
    <body><table border="1">
  `;

  const header = [
    'ИНН',
    'Dadata',
    'Аббр. 1',
    'Название 1',
    'Год получения этого названии',
    'Аббр. 2',
    'Название 2',
    'Год получения этого названии',
    'Аббр. 3',
    'Название 3',
    'Год получения этого названии',
    'Аббр. 4',
    'Название 4',
    'Год получения этого названии',
    'Аббр. 5',
    'Название 5',
    'Год получения этого названии',
    'Аббр. 6',
    'Название 6',
    'Год получения этого названии',
    'Аббр. 7',
    'Название 7',
    'Год получения этого названии',
  ];

  excelFile += "<tr>";

  header.map(elem => {
    excelFile += `<td>${elem}</td>`;
  });

  excelFile += "</tr>";


  for (let i = 2; i < rows.length; i++) {
    let cols = rows[i].querySelectorAll("td, th");

    excelFile += "<tr>";

    for (let j = 0; j < cols.length; j++) {
      if (![4, 7, 8, 9, 10, 11, 12].includes(j))
        continue;

      if (j == 4) {
        const data = Array.from(cols[j].querySelectorAll('.td-info-wrapper')).map(wrapper => {
          const inn = wrapper.querySelector('p:nth-of-type(1)')?.textContent.trim();
          const dadata = wrapper.querySelector('p:nth-of-type(2)')?.textContent.trim();
          const fullName = wrapper.querySelector('p:nth-of-type(3)')?.textContent.trim();
          const abbr = wrapper.querySelector('p:nth-of-type(4)')?.textContent.trim();
          const year = wrapper.querySelector('p:nth-of-type(5)')?.textContent.trim();

          return { inn, dadata, abbr, fullName, year };
        });

        for (const key in data[0]) {
          if (data[0][key] == undefined)
            data[0][key] = '';

          excelFile += "<td>" + data[0][key] ?? '' + "</td>";
        }
      } else {
        const data = Array.from(cols[j].querySelectorAll('.alt-name')).map(wrapper => {
          const abbr = wrapper.querySelector('p:nth-of-type(1)')?.textContent.trim();
          const fullName = wrapper.querySelector('p:nth-of-type(2)').textContent.trim();
          const year = wrapper.querySelector('p:nth-of-type(3)')?.textContent.trim();

          return { abbr, fullName, year };
        });

        for (const key in data[0]) {
          if (data[0][key] == undefined)
            data[0][key] = '';

          excelFile += "<td>" + data[0][key] ?? '' + "</td>";
        }
      }
    }

    excelFile += "</tr>";
  }

  excelFile += "</table></body></html>";

  // Используем `showSaveFilePicker` для выбора места сохранения файла
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: 'Excel File',
          accept: { 'application/vnd.ms-excel': ['.xls', '.xlsx'] }
        },
      ],
    });

    const writable = await handle.createWritable();
    await writable.write(excelFile);
    await writable.close();
  } catch (err) {
    console.error('Ошибка при сохранении файла:', err);
  }

  closeExportPopUp();
}

const checkOnMobile = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }

  return false;
}

const filterDataByAllCondition = () => {
  let dataFiltersTMP = dataSlice;

  // Фильтруем по типу школы 
  if (arrFiltersType.length <= 3) {
    let regTypeSchool = new RegExp(arrFiltersType.join('').replaceAll(', ', '|'), 'gi');
    dataFiltersTMP = dataFiltersTMP.filter((school) => school.fullName.match(regTypeSchool));
  }

  // Фильтруем по региону
  if (regionValueInput != '')
    dataFiltersTMP = dataFiltersTMP.filter((school) => school.address.match(regionValueInput))

  // Филтруем по всем полям быстрого поиска
  if (searchInput.length) {
    searchInput.forEach(inp => {
      let searchId = inp.dataset.searchValue,
        regSearch = new RegExp('^' + inp.value, 'gi'),
        regHighlight = new RegExp(inp.value, 'gi');

      searchId == 'fullName' ? (regHighlight = new RegExp(inp.value, 'g')) : false;
      dataFiltersTMP = dataFiltersTMP.filter((el) => String(el[searchId]).match(regSearch));
    })
  }

  tableRender(dataFiltersTMP);
}

const closeExportPopUp = () => {
  popupExport.style.display = 'none';
  inpExportEl.value = '';
  clearInterval(idInterval);
}

const setOldValueSchoolSelect = () => {
  checkboxTypeSchoolArr.forEach((el) => {
    if (oldValueSchoolSelect.includes(el.dataset.typeFilter)) {
      el.checked = true;
    } else {
      el.checked = false;
    }
  });
}

const setTypeSchoolValue = () => {
  arrFiltersType = [];

  checkboxTypeSchoolArr.forEach((checkbox) => {
    if (checkbox.checked) {
      arrFiltersType.push(checkbox.dataset.typeFilter);
      arrSchoolTypeSelect = checkbox.dataset.typeSelect
    }
  });

  arrFiltersType.length == 4 ? arrFiltersType.shift() : false;

  if (arrFiltersType.length == 0) {
    inpTypeSchool.value = '';
  } else if (arrFiltersType.length == 1) {
    selectResetArr[0].style.display = 'block';
    inpTypeSchool.value = `${arrSchoolTypeSelect}`;
  } else {
    selectResetArr[0].style.display = 'block';
    inpTypeSchool.value = `Тип учебного заведения (выбрано ${arrFiltersType.length})`;
  }
}

const checkOutOfBounds = (element, inaccuracy = 0) => {
  try {
    let rect = element.getBoundingClientRect(),
      rectBottom = rect.bottom + inaccuracy,
      isOutOfBounds;

    isOutOfBounds = (
      rect.top < 0 ||
      rect.left < 0 ||
      rectBottom > window.innerHeight ||
      rect.right > window.innerWidth
    );

    return isOutOfBounds;
  } catch (e) {
    console.error('Error:', e);
  }
}

const setHeightTextArae = () => {
  [
    '.edit-inp.edit-dadata', 
    '.edit-inp.edit-fullname', 
    '.edit-inp.fullAlt'
  ].map(selector => {
    const textarea = document.querySelectorAll(selector);

    if (textarea !== null) {
      textarea.forEach(elem => {
        elem.style.height = 'auto';
  
        let newHeight = elem.scrollHeight;
    
        if (elem.value == '') {
          newHeight = 54;
        }
    
        elem.style.height = `${newHeight}px`;
      })
    }
  });
}

const extendAltSchool = (school) => {
  // Приведение altSchool к объекту, если это массив
  if (Array.isArray(school.altSchool)) {
    // Преобразование массива в объект с индексами
    school.altSchool = school.altSchool.reduce((acc, item, index) => {
      acc[index + 1] = item;
      return acc;
    }, {});
  } else if (typeof school.altSchool !== 'object' || school.altSchool === null) {
    school.altSchool = {};
  }

  // Получаем текущие ключи и количество элементов в altSchool
  const keys = Object.keys(school.altSchool);
  const currentLength = keys.length;

  // Если количество элементов меньше 6, добавляем недостающие
  if (currentLength < 6) {
    const itemsToAdd = 6 - currentLength;
    const startIndex = keys.length > 0 ? Math.max(...keys.map(Number)) + 1 : 1;

    for (let i = 0; i < itemsToAdd; i++) {
      school.altSchool[startIndex + i] = {
        fullName: "",
        abbr: "",
        year: ""
      };
    }
  }

  return school;
}

const sortAltSchoolByYear = (school) => {
  // Проверяем, есть ли поле altSchool и является ли оно объектом
  if (!school.altSchool || typeof school.altSchool !== 'object') {
    throw new Error('Invalid altSchool school');
  }

  // Преобразуем объект в массив
  const altSchoolArray = Object.entries(school.altSchool).map(([key, value]) => ({
    key,
    ...value
  }));

  // Сортируем массив по полю year в порядке убывания
  altSchoolArray.sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return yearB - yearA;
  });

  // Преобразуем отсортированный массив обратно в объект
  let newKey = 1;
  const sortedAltSchool = altSchoolArray.reduce((acc, item) => {
    acc[newKey] = {
      year: item.year ?? "",
      fullName: item.fullName ?? "",
      abbr: item.abbr ?? ""
    };

    newKey++;
    
    return acc;
  }, {});

  // Обновляем поле altSchool в исходном объекте
  school.altSchool = sortedAltSchool;

  return school;
}

function prepareData() {
  dataSlice.forEach((school, index) => {
    dataSlice[index] = sortAltSchoolByYear(extendAltSchool(school));
  });
}
prepareData();

//Render table
function tableRender(dataValue) {
  const tbodyWrapperEl = document.querySelector('.tr-wrapper');
  tbodyWrapperEl.innerHTML = '';

  dataValue.forEach((school, index) => {
    let trEl = document.createElement('tr');
    trEl.classList.add('tr-school');

    let htmlThead = `
        <td class="table_mobile-thead">
        <div class="thead-container"> 
         <div class="thead-mobile-name">${school.fullName}</div>
          <div class="icons-wrapper-thead">
            <div class="thead-icon">
              <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
                <span class="icon control-edit edit" ></span>
              </div>
            </div>
            <div class="thead-icon">
              <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}" data-full-name="${school.fullName}">
                <span class="icon control-edit delete"></span>
              </div>
            </div>
          </div>
        </div>
      </td>
    `;
    let htmlTdNum = `<td data-prop="№">
      <div class="td-name">№</div>
      <p class="td-num">${index + 1}</p>
      <p class="table__value__id">${school.id}</p>
      </td>
      <td class="td-wrapper-icon">
      <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
        <span class="icon control-edit edit" ></span>
      </div>
      </td>
      <td class="td-wrapper-icon" >
      <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}" data-full-name="${school.fullName}">
        <span class="icon control-edit delete"></span>
      </div>
      </td>`;
    let htmlTdInfoAndFullNames = `   
      <td>
      <div class="td-name">ИНН\nАббревиатура\nГод</div>
      <div class="td-info-wrapper">
      <p>${checkUndef(school.inn)}</p>
      <p class="fullname fullname-abbr" hidden>${school.dadata}</p>
      <p class="fullname fullname-abbr">${school.fullName}</p>
      ${checkUndef(school.abbr) == '' ? '' : `<p class="table__abbr">${school.abbr}</p>`}
      <p class="table__year-name">${checkUndef(school.year)}</p>
      </div>
      </td>
      <td>
      <div class="td-name">Полное название</div>
      <p class="fullname"> ${school.fullName}</p>
      </td>
    `;
    let htmlTfoot = `
    <td class="table_mobile-tfoot">
    <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
      <span class="icon control-edit edit" ></span>
    </div>
    <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}" data-full-name="${school.fullName}">
      <span class="icon control-edit delete"></span>
    </div>
    </td>`;

    setTimeout(() => {
      const altSchool = school.altSchool;

      if (Object.keys(altSchool).length > 0) {
        for (const key in altSchool) {
          const elem = altSchool[key];

          // Создание и настройка элементов
          const altName1 = document.createElement('td');
          altName1.classList.add('td-alt');

          const tdTitleMobile = document.createElement('div');
          tdTitleMobile.classList.add('td-name');
          tdTitleMobile.innerText = 'Альтернативное\nназвание';
          altName1.append(tdTitleMobile);

          const altNameValues = document.createElement('div');
          altNameValues.classList.add('alt-name');

          const altNameChild = document.createElement('div');
          altNameChild.classList.add('alt-name__child');

          const pFullNameAlt = document.createElement('p');
          const pNameAlt = document.createElement('p');

          const fullName = checkUndef(elem.fullName);
          const abbr = checkUndef(elem.abbr);
          const year = checkUndef(elem.year);

          pFullNameAlt.innerText = fullName;
          pNameAlt.innerText = abbr;

          altNameChild.append(pNameAlt, pFullNameAlt);
          altNameValues.append(altNameChild);

          if (year) {
            const pYearAlt = document.createElement('p');
            pYearAlt.dataset.prevValue = year;
            pYearAlt.classList.add('table__year');
            pYearAlt.innerText = year;

            altNameValues.append(pYearAlt);
          }

          altName1.append(altNameValues);
          trEl.append(altName1);
        }
      }
    }, 0);

    if (checkOnMobile) {
      setTimeout(() => {
        document.querySelectorAll('.alt-name').forEach((el) => {
          el.innerText == '' ? el.parentNode.classList.add('empty') : false;
        });
      }, 0);
    }

    trEl.setAttribute('data-value-id', school.id);
    trEl.insertAdjacentHTML('beforeend', htmlThead);
    trEl.insertAdjacentHTML('beforeend', htmlTdNum);
    trEl.insertAdjacentHTML('beforeend', htmlTdInfoAndFullNames);
    trEl.insertAdjacentHTML('beforeend', htmlTfoot);

    tbodyWrapperEl.append(trEl);
  });

  //Btn edit
  editBtnArr = document.querySelectorAll('.edit-btn');
  editBtnArr.forEach((edit) => {
    edit.addEventListener('click', () => {
      btnAddAltEl.disabled = false;
      idTrTable = edit.dataset.valueId;

      let matchingTr = dataSlice.filter((el) => el.id == idTrTable).shift(),
          valuesCount = Object.entries(matchingTr.altSchool).filter(([key, { fullName, abbr }]) => fullName && abbr).length;
      countAddALtClick = valuesCount + 1;

      // Заполняем информацию по главному названию
      document.querySelector('.popup-edit-content-wrapper').innerHTML = `
        <div class="input__wrapper" style="flex-direction: column; align-items: flex-start">
          <label class="edit-label" data-edit-value="inn" pattern="[0-9]{10}"
            >ИНН
            <input class="edit-inp edit-inn" type="number" max="9999999999" placeholder="Введите ИНН" data-edit-value="inn" value="${checkUndef(matchingTr.inn)}"/> <div class="prompt-edit">
            <span class="icon" style="color: #D11521"></span>
            <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass> 
          </div>
          </label>
          <label class="edit-label" data-edit-value="dadata"><span class="edit-label__title">Название с сайта dadata.ru</span>
              <textarea class="edit-inp edit-dadata" disabled placeholder="Введите полное название" data-edit-value="dadata">${checkUndef(matchingTr.dadata)}</textarea>
              <div class="prompt-edit">
                <span class="icon" style="color: #D11521"></span>
                <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
              </div>
            </label>
          </label>
          <label class="edit-label " data-edit-value="fullName">Полное название
            <textarea class="edit-inp edit-fullname" placeholder="Введите полное название" data-edit-value="fullName">${checkUndef(matchingTr.fullName)}</textarea>
          <div class="prompt-edit">
            <span class="icon" style="color: #D11521"></span>
            <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
          </div>
          </label>
          <label class="edit-label " data-edit-value="fullName">Аббревиатура
            <div class="last_edit_abbr">
              <input type="text" class="edit-inp edit-fullname" placeholder="Введите аббревиатуру" data-edit-value="abbr" value="${checkUndef(matchingTr.abbr)}"/>
              <label class="edit-label" data-edit-value="year">
              <span>Год</span>
                <input
                  type="number"
                  class="edit-inp year-inp"
                  maxlength="4"
                  min="1800"
                  max="2024"
                  placeholder="Введите год"
                  pattern="[0-9]{4}" data-edit-value="year" value="${checkUndef(matchingTr.year)}"
              /></label>
            </div>
          <div class="prompt-edit">
            <span class="icon" style="color: #D11521"></span>
            <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
          </div>
          </label>
        </div>
      `;

      // Заполняем информацию по вльтернативным названиям
      if (valuesCount > 0) {
        let notEmptyAltSchool = Object.fromEntries(
            Object.entries(matchingTr.altSchool)
                .filter(([key, { fullName, abbr }]) => fullName && abbr)
        );
        
        for (const key in notEmptyAltSchool) {  
          newAltWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="popup-edit-content-wrapper" data-edit-form-id="${key}">
                  <div
                    class="input__wrapper"
                    style="flex-direction: column; align-items: flex-start">
                    <div class="popup-value__title">
                      <h3>Альтернативное название №${key}</h3>
                      <div
                        class="table-icon del-alt-name js-edit-btn-altDel"
                        data-value="Удалить"
                        data-edit-altDel="${key}">
                        <span class="icon control-edit delete"></span>
                      </div>
                    </div>
                    <label class="edit-label">
                      Полное наименование 
                      <textarea class="edit-inp fullAlt" placeholder="Введите полное наименование №${key}" data-edit-alt-value="fullName">${matchingTr.altSchool[key].fullName}</textarea>
                    </label>
                    <label class="edit-label">Альтернативное название
                      <div class="last_edit_abbr">
                        <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${key}" data-edit-alt-value="abbr" value="${matchingTr.altSchool[key].abbr}" />
                        <label class="edit-label">
                          <span>Год</span>
                          <input type="number" class="edit-inp year-inp" data-edit-alt-value="year" maxlength="4" min="1800" max="2400"placeholder="Введите год" value="${matchingTr.altSchool[key].year}" />
                        </label>
                      </div>
                    </label>
                  </div>
              </div>`
          );
        }
      }

      countAddALtClick >= 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);

      let inpNewValues = document.querySelectorAll('.edit-inp');

      popupEdit.style.display = '';
      const closeBtn = document.querySelectorAll('.popup-close');
      inpFullName = document.querySelector('.edit-fullname');
      inpInn = document.querySelector('.edit-inn');
      const promptSpanIdArr = document.querySelectorAll('.js-edit-id');
      const promptEditArr = document.querySelectorAll('.prompt-edit');
      inpFullName.addEventListener('input', () => {
        let checkVar = dataSlice
          .filter((el) => el.id != idTrTable)
          .some((el) => el.fullName == inpFullName.value);
        if (checkVar == false) {
          inpFullName.dataset.invalid = 'false';
          btnSaveEdit.disabled = false;
          promptEditArr[1].style.display = 'none';
        } else {
          inpFullName.dataset.invalid = 'true';
          btnSaveEdit.disabled = true;
          promptSpanIdArr[1].innerText = dataSlice.find(
            (el) => el.fullName == inpFullName.value
          ).id;
          promptEditArr[1].style.display = 'block';
        }
      });
      inpInn.addEventListener('input', () => {
        let checkVar = dataSlice
          .filter((el) => el.id != idTrTable)
          .some((el) => el.inn == inpInn.value);
        if (checkVar == false) {
          inpInn.dataset.invalid = 'false';
          btnSaveEdit.disabled = false;
          promptEditArr[0].style.display = 'none';
        } else {
          inpInn.dataset.invalid = 'true';
          btnSaveEdit.disabled = true;
          promptSpanIdArr[0].innerText = dataSlice.find((el) => el.inn == inpInn.value).id;
          promptEditArr[0].style.display = 'block';
        }
      });
      inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
        ? (btnSaveEdit.disabled = true)
        : (btnSaveEdit.disabled = false);
      inpNewValues.forEach((inp) => {
        inp.addEventListener('input', () => {
          setHeightTextArae();

          inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
            ? (btnSaveEdit.disabled = true)
            : (btnSaveEdit.disabled = false);
        });
        closeBtn.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            inpNewValues.forEach((inp) => (inp.value = ''));
            popupEdit.style.display = 'none';
            const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
            dataFormEl.forEach((formEl, index) => {
              countAddALtClick = 1;
              index != 0 ? formEl.remove() : false;
            });
          });
        });
        const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
        const delNewAlt = document.querySelectorAll('.js-edit-btn-altDel');
        delNewAlt.forEach((del, indexDel) => {
          dataFormEl.forEach((formEl, indexForm) => {
            del.addEventListener('click', () => {
              countAddALtClick = indexDel;
              countAddALtClick >= 6
                ? (btnAddAltEl.disabled = true)
                : (btnAddAltEl.disabled = false);
              indexDel + 1 == indexForm ? formEl.remove() : false;
              setPositionForButtonsEdit();
            });
          });
        });

        setPositionForButtonsEdit();
      });

      setHeightTextArae();
    });
  });

  //In total
  btnTotalEl.dataset.value = `нашлось: ${dataValue.length}`;
  fieldInTotalEl.innerText = dataValue.length;

  //Btn Delete table
  const delBtnArr = document.querySelectorAll('.del-btn');
  delBtnArr.forEach((del) => {
    del.addEventListener('click', () => {
      schoolIdEl.textContent = `id${del.dataset.valueId}`;
      schoolFullNameEl.textContent = del.dataset.fullName;
      btnDeleteTr.dataset.valueId = del.dataset.valueId;
      popupDel.style.display = '';
      const closeBtn = document.querySelectorAll('.popup-close');
      closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          popupDel.style.display = 'none';
        });
      });
    });
  });

  //Delete td
  const btnDeleteTr = document.querySelector('.btn-delete');
  let matchingId;
  const schoolTrElArr = document.querySelectorAll('.tr-school');
  btnDeleteTr.addEventListener('click', () => {
    schoolTrElArr.forEach((tr) => {
      if (tr.dataset.valueId == btnDeleteTr.dataset.valueId) {
        matchingId = tr.dataset.valueId;
      }
      popupDel.style.display = 'none';
    });

    dataSlice = dataSlice.filter((el) => el.id != matchingId);
    filterDataByAllCondition();
  });
}
tableRender(dataSlice);

//Save edit change
btnSaveEdit.addEventListener('click', (e) => {
  e.preventDefault();

  const index = dataSlice.findIndex((el) => el.id == idTrTable);
  let editElement  = {},
      newAltSchool = {};

  // Заполняем основные данные
  editElement.inn      = document.querySelector('input.edit-inp[data-edit-value="inn"]').value;
  editElement.dadata   = document.querySelector('textarea.edit-inp[data-edit-value="dadata"]').value;
  editElement.fullName = document.querySelector('textarea.edit-inp[data-edit-value="fullName"]').value;
  editElement.abbr     = document.querySelector('input.edit-inp[data-edit-value="abbr"]').value;
  editElement.year     = document.querySelector('input.edit-inp[data-edit-value="year"]').value;
  editElement.id       = dataSlice[index].id;
  editElement.address  = dataSlice[index].address;

  // Заполняем данные по альтернативным названиям
  ['fullName', 'abbr', 'year'].map(field => {
    let arInputs = document.querySelectorAll(`${field == 'fullName' ? 'textarea' : 'input'}.edit-inp[data-edit-alt-value="${field}"]`);

    if (arInputs.length) {
      arInputs.forEach((elem, keyInput) => {
        let index = keyInput + 1;

        if (!newAltSchool[index]) {
          newAltSchool[index] = {};
        }

        newAltSchool[index][field] = elem.value;
      });
    }
  });

  editElement.altSchool = newAltSchool;
  editElement = sortAltSchoolByYear(extendAltSchool(editElement));

  dataSlice[index] = editElement;

  filterDataByAllCondition();

  popupEdit.style.display = 'none';
  const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
  dataFormEl.forEach((formEl, index) => {
    countAddALtClick = 1;
    index != 0 ? formEl.remove() : false;
  });
});


const setPositionForButtonsEdit = () => {
  if (checkOutOfBounds(btnAddAltEl, 200)) {
    document.querySelector('.popup-edit-wrapper .popup-buttons').style.position = 'relative';
  } else {
    document.querySelector('.popup-edit-wrapper .popup-buttons').style.position = 'absolute';
  }
}

//Add new inputs in edit popup
btnAddAltEl.addEventListener('click', (e) => {
  e.preventDefault();

  newALtNameFormHTML = ` 
    <div class="popup-edit-content-wrapper" data-edit-form-id="${countAddALtClick}">
        <div
          class="input__wrapper"
          style="flex-direction: column; align-items: flex-start">
          <div class="popup-value__title">
            <h3>Альтернативное название №${countAddALtClick}</h3>
            <div
              class="table-icon del-alt-name js-edit-btn-altDel"
              data-value="Удалить"
              data-edit-altDel="${countAddALtClick + 1}">
              <span class="icon control-edit delete"></span>
            </div>
          </div>
          <label class="edit-label">Полное наименование <textarea class="edit-inp fullAlt" placeholder="Введите полное наименование №${countAddALtClick}" data-edit-alt-value="fullName"></textarea></label>
          <label class="edit-label">Аббревиатура
            <div class="last_edit_abbr">
              <input type="text" class="edit-inp edit-fullname" placeholder="Введите аббревиатуру" data-edit-alt-value="abbr" value=""/>
              <label class="edit-label">
              <span>Год</span>
                <input
                  type="number"
                  class="edit-inp year-inp"
                  maxlength="4"
                  min="1800"
                  max="2024"
                  placeholder="Введите год"
                  pattern="[0-9]{4}" data-edit-alt-value="year" value=""
              /></label>
            </div>
            <div class="prompt-edit">
              <span class="icon" style="color: #D11521"></span>
              <span class="prompt-edit-text">Уже есть в БД id<span class="js-edit-id"></span>, поэтому нельзя добавить в БД</spanclass>
            </div>
          </label>
        </div>
    </div>`;
  newAltWrapper.insertAdjacentHTML('beforeend', newALtNameFormHTML);

  setPositionForButtonsEdit();

  let inpNewValues = document.querySelectorAll('.edit-inp');
  inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
    ? (btnSaveEdit.disabled = true)
    : (btnSaveEdit.disabled = false);
  const delNewAlt = document.querySelectorAll('.js-edit-btn-altDel');
  countAddALtClick >= 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);

  inpNewValues.forEach((inp) => {
    inp.addEventListener('input', () => {
      setHeightTextArae();

      inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
        ? (btnSaveEdit.disabled = true)
        : (btnSaveEdit.disabled = false);
    });
  });

  const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
  delNewAlt.forEach((del, indexDel) => {
    dataFormEl.forEach((formEl, indexForm) => {
      del.addEventListener('click', () => {
        countAddALtClick = indexDel;
        countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);
        indexDel + 1 == indexForm ? formEl.remove() : false;
      });
    });
  });

  countAddALtClick++;
});

//Btn delete
delBtnArr.forEach((del) => {
  del.addEventListener('click', () => {
    schoolIdEl.textContent = `id${del.dataset.valueId}`;
    schoolFullNameEl.textContent = del.dataset.fullName;
    btnDeleteTr.dataset.valueId = del.dataset.valueId;
    popupDel.style.display = '';
    const closeBtn = document.querySelectorAll('.popup-close');
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popupDel.style.display = 'none';
      });
    });
  });
});

//Apply select
btnApply.addEventListener('click', () => {
  j = 1;
  arrSchoolTypeSelect = '';

  setTypeSchoolValue();
  filterDataByAllCondition();
});

//Select Reset
selectResetArr.forEach((reset, index) => {
  reset.addEventListener('click', (e) => {
    i = j = n = 0;
    reset.style.display = 'none'

    if (index == 0) {
      checkboxTypeSchoolArr.forEach((el) => { el.checked = false; (checkOnMobile()) ? el.parentElement.style.backgroundColor = 'unset' : ''; });
      arrFiltersType = [];
    }

    if (index == 1)
      regionValueInput = '';

    selectElArr[index].value = '';

    selectElArr[index].dataset.active = 'close';
    promptArr[index].dataset.active = 'close';
    selectArrowArr[index].dataset.active = 'close';
    selectResetArr[index].style.display = 'none';
    selectOverlay.style.display = 'none';
    arParentSelectEl[index].style.zIndex = 'unset';

    oldValueSchoolSelect = [];

    filterDataByAllCondition();
  });
});

const setEventsForOptionsAtSelects = (arSelect = { 0: '.js-type-school-value label', 1: '.filter-region' }) => {
  if (arSelect.length <= 0)
    return false;

  for (const key in arSelect) {
    let elem = arSelect[key];

    document.querySelectorAll(elem).forEach(
      (el) => {
        (el.onmousedown = function (e) {
          if (document.activeElement === selectElArr[key]) {
            e.preventDefault();
            e.stopPropagation();
          }
        })
      }
    );
  }
}
setEventsForOptionsAtSelects();

selectOverlay.addEventListener('click', () => {
  selectElArr.forEach((select, indexSelect) => {
    if (select.dataset.active == 'open') {
      select.dataset.active = 'close';
      promptArr[indexSelect].dataset.active = 'close';
      selectArrowArr[indexSelect].dataset.active = 'close';
      selectOverlay.style.display = 'none';
      arParentSelectEl[indexSelect].style.zIndex = 'unset';

      if (indexSelect == 1) {
        if (select.value == '') {
          selectResetArr[indexSelect].style.display = 'none';
        }
      } else {
        selectResetArr[indexSelect].style.display = 'none';
      }

      if (indexSelect == 0) {
        setOldValueSchoolSelect();
        setTypeSchoolValue();
      }
    }
  });
});

// Select settings
selectElArr.forEach((select, indexSelect) => {
  const closeSelect = (select, indexSelect, arrow, promptEl) => {
    select.dataset.active = 'close';
    arrow.dataset.active = 'close';
    promptEl.dataset.active = 'close';
    selectOverlay.style.display = 'none';
    arParentSelectEl[indexSelect].style.zIndex = 'unset';

    if (indexSelect == 0)
      setOldValueSchoolSelect();

    if (indexSelect == 0)
      setTypeSchoolValue();

    selectResetArr.forEach((reset, indexReset) => {
      if (indexReset == indexSelect && select.value == '') {
        reset.style.display = 'none';
      }
    });
  }

  const openSelect = (select, arrow, promptEl) => {
    select.dataset.active = 'open';
    arrow.dataset.active = 'open';
    selectOverlay.style.display = 'block';
    arParentSelectEl[indexSelect].style.zIndex = 20001;

    if (promptEl.querySelector('.js-region-filters__wrapper').childNodes.length > 0) {
      promptEl.dataset.active = 'open';
    }

    setTimeout(() => {
      if (checkOutOfBounds(promptEl)) {
        select.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  }

  selectResetArr.forEach((reset, indexReset) => {
    if (indexReset == indexSelect) {
      select.addEventListener('input', () => {
        reset.style.display = 'block';
      });
    }
  });

  promptArr.forEach((promptEl, indexPrompt) => {
    selectArrowArr.forEach((arrow, indexArrow) => {
      if (indexArrow == indexSelect && indexSelect == indexPrompt) {
        btnApply.addEventListener('click', () => {
          oldValueSchoolSelect = [];

          checkboxTypeSchoolArr.forEach((checkbox) => {
            if (checkbox.checked) {
              oldValueSchoolSelect.push(checkbox.dataset.typeFilter);
            }
          });

          closeSelect(select, indexSelect, arrow, promptEl)
        });

        [arrow, select].forEach(elem => {
          elem.addEventListener('click', (e) => {
            if (elem.dataset.active == 'open') {
              closeSelect(select, indexSelect, arrow, promptEl);
            } else {
              openSelect(select, arrow, promptEl);
            }
          });
        });

        if (indexSelect == 1) {
          promptEl.addEventListener('click', function () {
            closeSelect(select, indexSelect, arrow, promptEl);
          });
        }
      }
    });
  });
});

//Clear search
searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((btn, indexBtn) => {
    if (indexInp == indexBtn) {
      inp.addEventListener('input', () => {
        indexBtn == indexInp && inp.value == '' ? (btn.style.display = 'none') : false;
        indexBtn == indexInp && inp.value !== '' ? (btn.style.display = 'block') : false;
      });

      btn.addEventListener('click', () => {
        inp.value = '';
        btn.style.display = 'none';
      });
    }
  });
});

//Btn deselect
document.querySelector('.js-btn-deselect').addEventListener('click', () => {
  inputArr.forEach((inp) => {
    inp.value = '';
    checkboxTypeSchoolArr.forEach((checkbox) => (checkbox.checked = false));
    oldValueSchoolSelect = [];
    dataFilters = [];
    dataSlice = data.slice(0);
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    btnSearchResetArr.forEach((reset) => (reset.style.display = 'none'));
    document.querySelectorAll('.input-search.table').forEach((inp) => (inp.value = ''));
  });
  filterDataByAllCondition();
});

//Sort
function bySort(sortPar) {
  return (a, b) => (a[sortPar] > b[sortPar] ? 1 : -1);
}
function bySortRev(sortPar) {
  return (a, b) => (a[sortPar] < b[sortPar] ? 1 : -1);
}
document.querySelectorAll('.sort-table').forEach((sort) => {
  sort.addEventListener('click', () => {
    let sortValues = sort.dataset.sortValue;
    let sortData;
    count++;
    if (count % 2) {
      i == 1 || j == 1 || n == 1
        ? (sortData = dataFilters.sort(bySort(sortValues)))
        : (sortData = dataSlice.sort(bySort(sortValues)));
      tableRender(sortData);
    } else {
      i == 1 || j == 1 || n == 1
        ? (sortData = dataFilters.sort(bySortRev(sortValues)))
        : (sortData = dataSlice.sort(bySortRev(sortValues)));
      tableRender(sortData);
    }
  });
});

let allCheckedCount = 0;

//Filter Types school
checkboxTypeSchoolArr[0].addEventListener('click', () => {
  allCheckedCount++;
  allCheckedCount % 2
    ? checkboxTypeSchoolArr.forEach((el) => { el.checked = true; (checkOnMobile()) ? el.parentElement.style.backgroundColor = 'rgb(var(--light-blue), .2)' : ''; })
    : checkboxTypeSchoolArr.forEach((el) => { el.checked = false; (checkOnMobile()) ? el.parentElement.style.backgroundColor = 'unset' : ''; });
});

checkboxTypeSchoolArr.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (checkOnMobile()) {
      if (e.target.checked == true) {
        e.target.parentElement.style.backgroundColor = 'rgb(var(--light-blue), .2)';
      } else {
        e.target.parentElement.style.backgroundColor = 'unset';
      }
    }

    let checkboxChecked = document.querySelectorAll('.js-checkbox-school-type:checked');

    if (checkboxTypeSchoolArr[0].checked == true) {
      if (checkboxChecked.length - 1 < 3) {
        allCheckedCount++;
        checkboxTypeSchoolArr[0].checked = false;

        if (checkOnMobile())
          checkboxTypeSchoolArr[0].parentElement.style.backgroundColor = 'unset';
      }
    } else {
      if (checkboxChecked.length == 3) {
        checkboxTypeSchoolArr[0].click();
      }
    }

    e.stopPropagation();

    setTypeSchoolValue();
  });
});

const setEventToFilterRegion = (btn) => {
  btn.addEventListener('click', (e) => {
    i = 1;
    inpRegion.value = regionValueInput = btn.innerText.replaceAll('\n', '');

    selectResetArr[1].style.display = 'block';

    filterDataByAllCondition();
  });
}

//Filter Region
inpRegion.addEventListener('input', (event) => {
  regionValueInput = inpRegion.value;
  let myReg = new RegExp('^' + regionValueInput, 'gi'),
    regionsFind = regions.filter((el) => el.match(myReg)),
    filtersValuesHTML = '';

  if (regionsFind.length > 0) {
    regionsFind.slice(0, 10).forEach((region) => {
      let textHighlight = String(region).match(myReg).join(''),
        replaceText = `<span>${region}</span>`;

      if (String(region).match(myReg) && regionValueInput != '') {
        replaceText = replaceText
          .replace(
            textHighlight,
            `<span class="highlight">${String(region).match(myReg)}</span>`
          )
          .replaceAll(',', '');
        replaceText.charAt(0).toUpperCase() + replaceText.slice(1);
      }

      filtersValuesHTML += `
        <div class="filter-value filter-region">
          <label>${replaceText}</label>
        </div>
      `;
    });

    promptArr[1].dataset.active = 'open';
  } else {
    promptArr[1].dataset.active = 'close';
  }

  filtersWrapper.innerHTML = filtersValuesHTML;

  selectResetArr[1].addEventListener('click', () => {
    filtersWrapper.innerHTML = `
      <div class="filter-value filter-region">
        <label>Нижний Новгород</label>
      </div>
      <div class="filter-value filter-region">
        <label>Нижегородская область</label>
      </div>
      <div class="filter-value filter-region">
        <label>Арзамас</label>
      </div>
      <div class="filter-value filter-region">
        <label>Балахна</label>
      </div>
      <div class="filter-value filter-region">
        <label>Богородск</label>
      </div>
      <div class="filter-value filter-region">
        <label>Бор</label>
      </div>
      <div class="filter-value filter-region">
        <label>Выкса</label>
      </div>
      <div class="filter-value filter-region">
        <label>Дзержинск</label>
      </div>
      <div class="filter-value filter-region">
        <label>Кстово</label>
      </div>
      <div class="filter-value filter-region">
        <label>Павлово</label>
      </div>`;

    setEventsForOptionsAtSelects({ 1: '.filter-region' });

    document.querySelectorAll('.filter-region').forEach((btn) => {
      setEventToFilterRegion(btn);
    });
  });

  setEventsForOptionsAtSelects({ 1: '.filter-region' });

  document.querySelectorAll('.filter-region').forEach((btn) => {
    setEventToFilterRegion(btn);
  });
});
btnRegionArr.forEach((btn) => {
  setEventToFilterRegion(btn)
});

//Search
const setMaxHeightSearchInput = () => {
  let searchRow = document.querySelector('.table_desktop .tr_empty:nth-child(2)'),
    searchInputs = document.querySelectorAll('.input-search.table'),
    maxHeightSearchInput = 50,
    counEmptyInputValue = 0;

  searchRow.style.height = `auto`;

  searchInputs.forEach((inp) => {

    if (inp.value == '') {
      counEmptyInputValue++;
      return;
    }

    if (maxHeightSearchInput < inp.scrollHeight) {
      maxHeightSearchInput = inp.scrollHeight;
    }
  });

  if (maxHeightSearchInput > 50) {
    maxHeightSearchInput += 10;
  }

  searchRow.style.height = `${maxHeightSearchInput}px`;
}

const showHint = (inp, promptEl, resetBtn) => {
  selectOverlay.style.display = 'block';
  inp.style.backgroundColor = 'white';
  inp.style.zIndex = 20001;
  promptEl.style.zIndex = 20001;
  resetBtn.style.zIndex = 20001;

  if (window.screen.width <= 880) {
    inp.style.position = 'relative';
  }
}
const hideHint = (inp, promptEl, resetBtn) => {
  selectOverlay.style.display = 'none';
  inp.style.backgroundColor = 'transparent';
  inp.style.zIndex = 'unset';
  promptEl.style.zIndex = 'unset';
  resetBtn.style.zIndex = 'unset';
}

document.querySelectorAll('.input-search.table').forEach((inp, indexInp) => {
  tableSearchBtnReset[indexInp].addEventListener('click', (e) => {
    let resetBtn = e.target.parentElement;

    inp.value = '';
    resetBtn.style.display = 'none';
    resetBtn.parentElement.querySelector('.search-table').style.display = 'block';

    hideHint(inp, promptSearchArr[indexInp], resetBtn);
    setMaxHeightSearchInput();
    filterDataByAllCondition();
  });
});

searchInput.forEach((inp, indexInp) => {
  inp.addEventListener('blur', () => {
    setTimeout(() => {
      promptSearchArr[indexInp].style.display = 'none';
      hideHint(inp, promptSearchArr[indexInp], btnSearchResetArr[indexInp]);

      if (inp.value == '') {
        loopIconsArr[indexInp].style.display = 'block';
      }
    }, 100);
  });
  inp.addEventListener('click', () => {
    if (inp.value != '') {
      btnSearchResetArr[indexInp].style.display = 'block';
    }

    loopIconsArr[indexInp].style.display = 'none';

    promptSearchArr[indexInp].style.display = 'block';

    if (checkOutOfBounds(promptSearchArr[indexInp])) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    showHint(inp, promptSearchArr[indexInp], btnSearchResetArr[indexInp]);
  });

  inp.addEventListener('input', () => {
    if (inp.value != '') {
      loopIconsArr[indexInp].style.display = 'none';
    }

    showHint(inp, promptSearchArr[indexInp], btnSearchResetArr[indexInp]);

    promptSearchArr[indexInp].style.display = 'block';
    inp.value == '' ? inp.blur() : false;
    let searchId = inp.dataset.searchValue;
    let valueInput = '';
    inp.value !== ''
      ? (valueInput =
        inp.value[0].replace(inp.value[0], inp.value[0].toUpperCase()) + inp.value.slice(1))
      : (valueInput = '');
    valueInput == '*' ? (valueInput = undefined) : false;
    let valuesSearchHTML = '';
    let regSearch = new RegExp('^' + valueInput, 'gi');
    let regHighlight = new RegExp(valueInput, 'gi');
    searchId == 'fullName' ? (regHighlight = new RegExp(valueInput, 'gi')) : false;
    if (i == 1 || j == 1 || n == 1) {
      let textHighlight = '';
      let textOriginal = '';
      let replaceText = '';
      if (valueInput == '' || inp.value === undefined) {
        searchInput[indexInp].value = '';
        btnSearchResetArr[indexInp].style.display = 'none';
        loopIconsArr[indexInp].style.display = 'block';
        promptSearchArr[indexInp].style.display = 'none';

        inp.blur();
        n = 0;
        filterDataByAllCondition();
      } else {
        let currentData = dataFilters;
        let filteredData = currentData
          .filter((el) => String(el[searchId]).match(regSearch))
          .filter((value, index, self) =>
            index === self.findIndex((el) => (
              el[searchId] === value[searchId]
            ))
          )
          .slice(0, 6);

        if (filteredData.length <= 0) {
          promptSearchArr[indexInp].style.display = 'none';
        } else {
          filteredData.forEach((el) => {
            textHighlight = String(el[searchId]).match(regHighlight).join('');
            textOriginal = String(el[searchId]).toLowerCase();
            replaceText = textOriginal
              .replace(
                textHighlight.toLowerCase(),
                `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
              )
              .replaceAll(',', '');
            valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
            promptSearchArr[indexInp].innerHTML = valuesSearchHTML;
          });
        }

        valueInput == '' ? filterDataByAllCondition() : false;
      }
    } else {
      let textHighlight = '';
      let textOriginal = '';
      let replaceText = '';
      let filteredData = dataSlice
        .filter((el) => String(el[searchId]).match(regSearch))
        .filter((value, index, self) =>
          index === self.findIndex((el) => (
            el[searchId] === value[searchId]
          ))
        )
        .slice(0, 6);

      if (filteredData.length <= 0) {
        promptSearchArr[indexInp].style.display = 'none';
      } else {
        filteredData.forEach((el) => {
          textHighlight = String(el[searchId]).match(regHighlight).join('');
          textOriginal = String(el[searchId]).toLowerCase();
          replaceText = textOriginal
            .replace(
              textHighlight.toLowerCase(),
              `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
            )
            .replaceAll(',', '');
          valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
          promptSearchArr[indexInp].innerHTML = valuesSearchHTML;
        });
      }

      if (valueInput == '') {
        promptSearchArr[indexInp].style.display = 'none';
      }

      filterDataByAllCondition();
    }

    if (checkOutOfBounds(promptSearchArr[indexInp])) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('.search-value').forEach(
      (el) =>
      (el.onmousedown = function (e) {
        e.preventDefault();
      })
    );

    document.querySelectorAll('.search-value').forEach((el) => {
      el.innerText.includes('UNDEFINED') ? (el.style.color = 'rgba(0, 0, 0, 0)') : false;
      el.addEventListener('click', () => {
        let parent = el.parentElement.parentElement,
          input = parent.querySelector('textarea.input-search.table'),
          promptSearch = parent.querySelector('.prompt-search'),
          resetBtn = parent.querySelector('.btn-reset-search');

        n = 1;
        input.value = el.textContent;
        input.value == 'undefined' ? (input.style.color = 'rgba(0, 0, 0, 0)') : false;
        promptSearch.style.display = 'none';

        if (input.value != '') {
          resetBtn.style.display = 'block';
        }

        hideHint(input, promptSearch, resetBtn);
        setMaxHeightSearchInput();
        filterDataByAllCondition();
      });
    });
  });
});

//POPUPS
//export
exportBtnEl.addEventListener('click', () => {
  popupExport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  let date = new Date();
  let month = date.getMonth();
  function monthFixed(month) {
    return String(month).length == 1 ? '0' + (month + 1) : month + 1;
  }
  let yearDate = date.getFullYear();
  let time = String(date).slice(15, 24).replaceAll(':', '_');
  let str = `Альтернативные названия учебных заведений ${date.getDate()}.${monthFixed(
    month
  )}.${yearDate} ${time}.xlsx`;
  inpExportEl.value = str;
  idInterval = setInterval(() => {
    let date = new Date();
    let month = date.getMonth();
    function monthFixed(month) {
      return String(month).length == 1 ? '0' + (month + 1) : month + 1;
    }
    let yearDate = date.getFullYear();
    let time = String(date).slice(15, 24).replaceAll(':', '_');
    let str = `Альтернативные названия учебных заведений ${date.getDate()}.${monthFixed(
      month
    )}.${yearDate} ${time}.xlsx`;
    inpExportEl.value = str;
  }, 5000);
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeExportPopUp();
    });
  });
});

// import
inpImportEl.addEventListener('change', (e) => {
  pFileName.innerText = e.target.files[0].name;
  document.querySelector('.placeholder').style.display = 'none';
});
importBtnEl.addEventListener('click', () => {
  popupImport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupImport.style.display = 'none';
    });
  });
});

exportButton.addEventListener('click', () => {
  exportTableToExcel(inpExportEl.value);
});