import { data } from '../data/data.js';
import { regions } from '../data/regions.js';

let scrollPosition;
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
  localStorage.setItem('pos', scrollPosition);
});

let scroll = JSON.parse(localStorage.getItem('pos'));
window.onload = () => {
  window.scrollTo({ top: scroll });
};
let dataSlice = data.slice(0, 30);
function checkUndef(prop) {
  if (prop === undefined) {
    return '';
  } else return prop;
}
const btnTotalEl = document.querySelector('.js-btn-total');
const fieldInTotalEl = document.querySelector('.js-total-value');
let counter = 0;
function tableRender(dataValue) {
  const tbodyWrapperEl = document.querySelector('.tr-wrapper');

  tbodyWrapperEl.innerHTML = '';

  dataValue.forEach((school, index) => {
    return (tbodyWrapperEl.innerHTML += `
      <tr class="tr-school" data-value-id="${school.id}" >
        <td class="table_mobile-thead">
        <div class="thead-container"> 
         <div class="thead-mobile-name">${school.fullName}</div>
          <div class="icons-wrapper-thead">
            <div class="thead-icon">
              <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${
                school.id
              }">
                <span class="icon control-edit edit" ></span>
              </div>
            </div>
            <div class="thead-icon">
              <div class="table-icon del-btn" data-value="Удалить" data-value-id="${
                school.id
              }" data-full-name="${school.fullName}">
                <span class="icon control-edit delete"></span>
              </div>
            </div>
          </div>
        </div>
      </td>
        <td data-prop="№">
          <div class="td-name">№</div>
          <p>${index + 1}</p>
          <p class="table__value__id">${school.id}</p>
        </td>
        <td class="td-wrapper-icon">
          <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
            <span class="icon control-edit edit" ></span>
          </div>
        </td>
        <td class="td-wrapper-icon" >
          <div class="table-icon del-btn" data-value="Удалить" data-value-id="${
            school.id
          }" data-full-name="${school.fullName}">
            <span class="icon control-edit delete"></span>
          </div>
        </td>
        <td>
        <div class="td-name">Абревиатура\nИНН\nГод</div>
        <div>
        <p>${checkUndef(school.inn)}</p>
          <p>${checkUndef(school.abbr)}</p>
          <p class="table__year">${checkUndef(school.year)}</p>
        </div>
        </td>
        <td>
          <div class="td-name">Полное название</div>
          <p class="fullname"> ${school.fullName}</p>
        </td>
        <td >
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt1)}</p>
            <p class="table__year">${checkUndef(school.year1)}</p>
          </div>
        </td>
        <td>
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt2)}</p>
            <p class="table__year">${checkUndef(school.year2)}</p>
          </div>
        </td>
        <td >
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt3)}</p>
            <p class="table__year">${checkUndef(school.year3)}</p>
          </div>
        </td>
        <td>
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt4)}</p>
            <p class="table__year">${checkUndef(school.year4)}</p>
          </div>
        </td>
        <td>
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt5)}</p>
            <p class="table__year">${checkUndef(school.year5)}</p>
          </div>
        </td>
        <td>
        <div class="td-name">Альтернативное\nназвание</div>
          <div>
            <p>${checkUndef(school.alt6)}</p>
            <p class="table__year">${checkUndef(school.year6)}</p>
          </div>
        </td>
        <td class="table_mobile-tfoot">
           <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
            <span class="icon control-edit edit" ></span>
          </div>
           <div class="table-icon del-btn" data-value="Удалить" data-value-id="${
             school.id
           }" data-full-name="${school.fullName}">
            <span class="icon control-edit delete"></span>
          </div>
        </td>
    </tr>
    `);
  });
  btnTotalEl.dataset.value = `нашлось: ${dataValue.length}`;
  fieldInTotalEl.innerText = dataValue.length;
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
    if (i == 1 || j == 1) {
      dataFilters = dataFilters.filter((el) => el.id != matchingId);
      tableRender(dataFilters.filter((el) => el.id != matchingId));
    } else {
      dataSlice = dataSlice.filter((el) => el.id != matchingId);
      tableRender(dataSlice.filter((el) => el.id != matchingId));
    }
  });
}

tableRender(dataSlice);
const inpRegion = document.querySelector('.js-select-region');
const inpTypeSchool = document.querySelector('.js-select-type-school');
const selectElArr = document.querySelectorAll('.main__select');
const selectArrowArr = document.querySelectorAll('.btn-select');
const selectResetArr = document.querySelectorAll('.btn-select-reset');
const promptArr = document.querySelectorAll('.prompt-filter');
const btnApply = document.querySelector('.btn-apply-filter');
const searchInput = document.querySelectorAll('.input-search');
const btnSearchResetArr = document.querySelectorAll('.btn-reset-search');
const exportBtnEl = document.querySelector('.js-popup-export');
const popupExport = document.querySelector('.export');
const editBtnArr = document.querySelectorAll('.edit-btn');
const popupEdit = document.querySelector('.popup-edit');
const delBtnArr = document.querySelectorAll('.del-btn');
const popupDel = document.querySelector('.popup-delete');
const schoolIdEl = document.querySelector('.school-id');
const schoolFullNameEl = document.querySelector('.school-name');
const filtersWrapper = document.querySelector('.js-region-filters__wrapper');
const promptSearchArr = document.querySelectorAll('.prompt-search');
let n = 0;

//search
searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((reset, indexReset) => {
    reset.addEventListener('click', () => {
      document.querySelectorAll('input').forEach((inp) => (inp.value = ''));
      n = 0;
      dataFilters = dataSlice;
      tableRender(dataSlice);
    });
    indexReset == indexInp && inp.value == '' ? (reset.style.display = 'none') : false;
  });
});
promptSearchArr.forEach((promptEl, promptIndex) => {
  btnSearchResetArr.forEach((reset, indexReset) => {
    reset.addEventListener('click', () => {
      indexReset == promptIndex ? (promptEl.style.display = 'none') : false;
    });
  });
});

searchInput.forEach((inp, indexInp) => {
  promptSearchArr.forEach((promptEl, promptIndex) => {
    inp.addEventListener('input', () => {
      n = 1;

      if (indexInp == promptIndex) {
        promptEl.style.display = 'block';
        let searchId = inp.dataset.searchValue;
        let valueInput = inp.value;
        let valuesSearchHTML = '';
        let regSearch = new RegExp(valueInput, 'gi');
        if (i == 1 || j == 1) {
          dataFilters = dataFilters.filter((el) => el[searchId].match(regSearch)).slice(0, 6);
          dataFilters.forEach((el) => {
            valuesSearchHTML += `<div class="search-value">${el[searchId]}</div>`;
            promptEl.innerHTML = valuesSearchHTML;
          });
          if (valueInput == '') {
            tableRender(dataSlice);
            dataFilters = dataSlice;
            promptEl.style.display = 'none';
          }
          document.querySelectorAll('.search-value').forEach((el) => {
            el.addEventListener('click', () => {
              inp.value = el.textContent;
              valueInput = el.textContent;
              regSearch = new RegExp('^' + valueInput, 'gi');
              promptEl.style.display = 'none';
              dataFilters = dataSlice.filter((el) => el[searchId].match(regSearch)).slice(0, 6);
              tableRender(dataSlice.filter((el) => el[searchId].match(regSearch)).slice(0, 6));
            });
          });
        } else {
          dataFilters = dataSlice.filter((el) => el[searchId].match(regSearch)).slice(0, 6);
          dataSlice
            .filter((el) => el[searchId].match(regSearch))
            .slice(0, 6)
            .forEach((el) => {
              valuesSearchHTML += `<div class="search-value">${el[searchId]}</div>`;
              promptEl.innerHTML = valuesSearchHTML;
            });
          if (valueInput == '') {
            promptEl.style.display = 'none';
            tableRender(dataFilters);
          }
          document.querySelectorAll('.search-value').forEach((el) => {
            el.addEventListener('click', () => {
              inp.value = el.textContent;
              valueInput = el.textContent;
              regSearch = new RegExp('^' + valueInput, 'gi');
              promptEl.style.display = 'none';
              dataFilters = dataSlice.filter((el) => el[searchId].match(regSearch)).slice(0, 6);
              tableRender(dataSlice.filter((el) => el[searchId].match(regSearch))).slice(0, 6);
            });
          });
          tableRender(dataSlice.filter((el) => el[searchId].match(regSearch)).slice(0, 6));
          valueInput == '' ? tableRender(dataSlice) : false;
        }
      }
    });
  });
});
//Кнопки редактирования и удаления
editBtnArr.forEach((edit) => {
  edit.addEventListener('click', () => {
    popupEdit.style.display = '';
    const closeBtn = document.querySelectorAll('.popup-close');
    closeBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        popupEdit.style.display = 'none';
      });
    });
  });
});
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

exportBtnEl.addEventListener('click', () => {
  popupExport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupExport.style.display = 'none';
    });
  });
});
//Импорт
const importBtnEl = document.querySelector('.js-popup-import');
const popupImport = document.querySelector('.import');

importBtnEl.addEventListener('click', () => {
  popupImport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupImport.style.display = 'none';
    });
  });
});
let dataFilters = [];
let i = 0;
let j = 0;

//Фильтр региона
let arrFiltersType = [];
const btnRegionArr = document.querySelectorAll('.filter-region');
let regionValueInput;
inpRegion.addEventListener('input', () => {
  regionValueInput = inpRegion.value;
  let myReg = new RegExp('^' + regionValueInput, 'gi');
  let filtersValuesHTML = '';
  let regionsFind = regions.filter((el) => el.match(myReg));
  regionsFind.slice(0, 10).forEach((region) => {
    filtersValuesHTML += `
    <div class="filter-value filter-region">
      <label>${region}</label>
    </div>`;
  });
  filtersWrapper.innerHTML = filtersValuesHTML;
  const btnRegionArr = document.querySelectorAll('.filter-region');
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
    const btnRegionArr = document.querySelectorAll('.filter-region');
    btnRegionArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        i = 1;
        inpRegion.value = btn.innerText;
        regionValueInput = inpRegion.value;
        selectResetArr[1].style.display = 'block';
        j == 1 || n == 1
          ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
          : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
        j !== 1 || n !== 1
          ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
          : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
        console.log(dataFilters);
      });
    });
  });
  btnRegionArr.forEach((btn) => {
    btn.addEventListener('click', () => {
      i = 1;
      inpRegion.value = btn.innerText;
      regionValueInput = inpRegion.value;
      selectResetArr[1].style.display = 'block';
      j == 1 || n == 1
        ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
        : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
      j !== 1 || n !== 1
        ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
        : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
      console.log(dataFilters);
    });
  });
});
btnRegionArr.forEach((btn) => {
  btn.addEventListener('click', () => {
    i = 1;
    inpRegion.value = btn.innerText;
    regionValueInput = inpRegion.value;
    selectResetArr[1].style.display = 'block';
    j == 1 || n == 1
      ? tableRender(dataFilters.filter((school) => school.address.match(regionValueInput)))
      : tableRender(dataSlice.filter((school) => school.address.match(regionValueInput)));
    j !== 1 || n !== 1
      ? (dataFilters = dataSlice.filter((school) => school.address.match(regionValueInput)))
      : (dataFilters = dataFilters.filter((school) => school.address.match(regionValueInput)));
    console.log(dataFilters);
  });
});

//Фильтр по типам
const checkboxTypeSchoolArr = document.querySelectorAll('.js-checkbox-school-type');
btnApply.addEventListener('click', () => {
  j = 1;
  arrFiltersType = [];
  checkboxTypeSchoolArr.forEach((checkbox) => {
    checkbox.checked ? arrFiltersType.push(checkbox.dataset.typeFilter) : false;
  });

  arrFiltersType.length == 4 ? arrFiltersType.shift() : false;
  if (arrFiltersType.length == 0) {
    inpTypeSchool.value = '';
  } else {
    selectResetArr[0].style.display = 'block';
    inpTypeSchool.value = `Тип учебного заведения (выбрано ${arrFiltersType.length})`;
  }
  if (arrFiltersType.length >= 3) {
    true;
  } else {
    let regTypeSchool = new RegExp(arrFiltersType.join('').replaceAll(', ', '|'), 'gi');
    i == 1 || n == 1
      ? tableRender(dataFilters.filter((school) => school.fullName.match(regTypeSchool)))
      : tableRender(dataSlice.filter((school) => school.fullName.match(regTypeSchool)));
    i !== 1 || n !== 1
      ? (dataFilters = dataSlice.filter((school) => school.fullName.match(regTypeSchool)))
      : (dataFilters = dataFilters.filter((school) => school.fullName.match(regTypeSchool)));
  }
});
//

selectResetArr.forEach((reset) => {
  reset.addEventListener('click', () => {
    i = 0;
    j = 0;
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    selectElArr.forEach((select) => {
      select.value = '';
    });

    tableRender(dataSlice);
  });
});
//
let countAllCheckbox = 0;
checkboxTypeSchoolArr[0].addEventListener('click', () => {
  countAllCheckbox++;
  countAllCheckbox % 2
    ? checkboxTypeSchoolArr.forEach((el) => (el.checked = true))
    : checkboxTypeSchoolArr.forEach((el) => (el.checked = false));
});
checkboxTypeSchoolArr.forEach((el) => {
  el.addEventListener('click', () => {
    promptArr[0].dataset.active = 'open';
  });
});
selectElArr.forEach((select, indexSelect) => {
  selectResetArr.forEach((reset, indexReset) => {
    if (indexReset == indexSelect) {
      select.addEventListener('input', () => {
        reset.style.display = 'block';
      });
    }
  });

  let countArrowClick = 0;

  promptArr.forEach((promptEl, indexPrompt) => {
    selectArrowArr.forEach((arrow, indexArrow) => {
      if (indexArrow == indexSelect && indexSelect == indexPrompt) {
        btnApply.addEventListener('click', () => {
          select.dataset.active = 'close';
          arrow.dataset.active = 'close';
          promptEl.dataset.active = 'close';
        });

        arrow.addEventListener('click', () => {
          countArrowClick++;
          if (countArrowClick % 2) {
            select.dataset.active = 'open';
            arrow.dataset.active = 'open';
            promptEl.dataset.active = 'open';
          } else {
            select.dataset.active = 'close';
            arrow.dataset.active = 'close';
            promptEl.dataset.active = 'close';
          }
        });
        select.addEventListener('click', () => {
          select.dataset.active = 'open';

          arrow.dataset.active = 'open';
          promptEl.dataset.active = 'open';
        });
        select.addEventListener('blur', () => {
          select.dataset.active = 'close';
          arrow.dataset.active = 'close';
          promptEl.dataset.active = 'close';
        });
      }
    });
  });
});
//Очистить инпут
searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((btn, indexBtn) => {
    if (indexInp == indexBtn) {
      inp.addEventListener('input', () => {
        btn.style.display = 'block';
      });
    }
    btn.addEventListener('click', () => {
      indexInp == indexBtn ? (inp.value = '') : false;
      btn.style.display = 'none';
    });
  });
});

const inputArr = document.querySelectorAll('input');
document.querySelector('.js-btn-deselect').addEventListener('click', () => {
  inputArr.forEach((inp) => {
    inp.value = '';
    inp.checked = false;
    dataFilters = [];
    dataSlice = data.slice(0, 50);
    i = 0;
    j = 0;
    n = 0;
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    btnSearchResetArr.forEach((reset) => (reset.style.display = 'none'));
  });
  tableRender(dataSlice);
});
const inpExportEl = document.querySelector('.input-export');

const linkDownloadEl = document.querySelector('.link-download');

linkDownloadEl.addEventListener('click', () => {
  let date = new Date();
  let month = date.getMonth();
  function monthFixed(month) {
    return String(month).length == 1 ? '0' + (month + 1) : month + 1;
  }
  let yearDate = date.getFullYear();
  let time = String(date).slice(15, 24).replaceAll(':', '_');
  let str = `Альтернативные названия учебных заведений ${date.getDate()}.${monthFixed(
    month
  )}.${yearDate} ${time}`;
  let nameFile = inpExportEl.value;

  inpExportEl.value == '' ? (nameFile = str) : undefined;
  linkDownloadEl.setAttribute('download', nameFile);
  inpExportEl.value = '';
});
const pFileName = document.querySelector('.filename');
const inpImportEl = document.querySelector('.input-import');

inpImportEl.addEventListener('change', (e) => {
  pFileName.innerText = e.target.files[0].name;
  document.querySelector('.placeholder').style.display = 'none';
});

function bySort(sortPar) {
  return (a, b) => (a[sortPar] > b[sortPar] ? 1 : -1);
}
function bySortRev(sortPar) {
  return (a, b) => (a[sortPar] < b[sortPar] ? 1 : -1);
}
let count = 0;
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
const main = document.querySelector('.main');
document.querySelectorAll('.mobile-control__tab-name').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.innerText !== 'АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ'
      ? (main.style.display = 'none')
      : (main.style.display = 'block');
  });
});
