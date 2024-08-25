import { data } from '../data/data.js';
import { regions } from '../data/regions.js';

// variables
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
const btnAddAltEl = document.querySelector('.btn-add-alt');
const newAltWrapper = document.querySelector('.wrap-forms-edit');
const btnSaveEdit = document.querySelector('.btn-save');
const importBtnEl = document.querySelector('.js-popup-import');
const popupImport = document.querySelector('.import');
const titlePage = document.querySelector('.title-page__wrapper');
const btnRegionArr = document.querySelectorAll('.filter-region');
const checkboxTypeSchoolArr = document.querySelectorAll('.js-checkbox-school-type');
const inputArr = document.querySelectorAll('input');
const main = document.querySelector('.main');
const inpExportEl = document.querySelector('.input-export');
const linkDownloadEl = document.querySelector('.link-download');
const inpFullName = document.querySelector('.edit-fullname');
const inpInn = document.querySelector('.edit-inn');
const promptSpanIdArr = document.querySelectorAll('.js-edit-id');
const promptEditArr = document.querySelectorAll('.prompt-edit');
const pFileName = document.querySelector('.filename');
const inpImportEl = document.querySelector('.input-import');
let regionValueInput;
let scrollPosition;
let dataSlice = data.slice(0, 50);
let editBtnArr = document.querySelectorAll('.edit-btn');
let scroll = JSON.parse(localStorage.getItem('pos'));
let count = 0;
let n = 0;
let countAddALtClick = 1;
let newALtNameFormHTML = '';
let idTrTable = '';
let inpNewValues = document.querySelectorAll('.edit-inp');
let dataFilters = [];
let i = 0;
let j = 0;
let arrFiltersType = [];
let arrSchoolTypeSelect = '';
let countAllCheckbox = 0;
function checkUndef(prop) {
  if (prop === undefined) {
    return '';
  } else return prop;
}

// Scroll position
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
  localStorage.setItem('pos', scrollPosition);
});
window.onload = () => {
  window.scrollTo({ top: scroll });
};
//Render table
function tableRender(dataValue) {
  const tbodyWrapperEl = document.querySelector('.tr-wrapper');
  tbodyWrapperEl.innerHTML = '';
  // Render HTML
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
        <div class="td-name">Аббревиатура\nИНН\nГод</div>
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
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
            <p>${checkUndef(school.alt1)}</p>
            <p class="table__year">${checkUndef(school.year1)}</p>
          </div>
        </td>
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
            <p>${checkUndef(school.alt2)}</p>
            <p class="table__year">${checkUndef(school.year2)}</p>
          </div>
        </td>
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
            <p>${checkUndef(school.alt3)}</p>
            <p class="table__year">${checkUndef(school.year3)}</p>
          </div>
        </td>
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
            <p>${checkUndef(school.alt4)}</p>
            <p class="table__year">${checkUndef(school.year4)}</p>
          </div>
        </td>
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
            <p>${checkUndef(school.alt5)}</p>
            <p class="table__year">${checkUndef(school.year5)}</p>
          </div>
        </td>
        <td class="td-alt">
        <div class="td-name">Альтернативное\nназвание</div>
          <div class="alt-name">
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

  //edit btn table
  editBtnArr = document.querySelectorAll('.edit-btn');
  editBtnArr.forEach((edit) => {
    edit.addEventListener('click', () => {
      let inpNewValues = document.querySelectorAll('.edit-inp');
      inpNewValues.forEach((el) => (el.value = ''));
      idTrTable = edit.dataset.valueId;
      popupEdit.style.display = '';
      const closeBtn = document.querySelectorAll('.popup-close');
      closeBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          popupEdit.style.display = 'none';
          const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
          dataFormEl.forEach((formEl, index) => {
            countAddALtClick = 1;
            index != 0 ? formEl.remove() : false;
          });
        });
      });
      inpNewValues.forEach((inp) => {
        inp.addEventListener('input', () => {
          inpNewValues.length !== Array.from(inpNewValues).filter((el) => el.value !== '').length
            ? (btnSaveEdit.disabled = true)
            : (btnSaveEdit.disabled = false);
        });
      });
    });
  });

  //Save edit change
  const btnSaveEdit = document.querySelector('.btn-save');
  btnSaveEdit.addEventListener('click', (e) => {
    e.preventDefault();
    let editElement = dataSlice.find((el) => el.id == idTrTable);
    inpNewValues = document.querySelectorAll('.edit-inp');
    editElement.inn = inpNewValues[0].value;
    editElement.fullName = inpNewValues[1].value;
    editElement.abbr = inpNewValues[2].value;
    editElement.year = inpNewValues[3].value;
    editElement.alt1 = inpNewValues[4].value;
    if (inpNewValues.length > 5) {
      editElement.alt2 = inpNewValues[5].value;
      editElement.year1 = inpNewValues[6].value;
    }
    if (inpNewValues.length > 7) {
      editElement.alt3 = inpNewValues[7].value;
      editElement.year2 = inpNewValues[8].value;
    }
    if (inpNewValues.length > 9) {
      editElement.alt4 = inpNewValues[9].value;
      editElement.year3 = inpNewValues[10].value;
    }
    if (inpNewValues.length > 11) {
      editElement.alt5 = inpNewValues[11].value;
      editElement.year4 = inpNewValues[12].value;
    }
    if (inpNewValues.length > 13) {
      editElement.alt6 = inpNewValues[13].value;
      editElement.year5 = inpNewValues[14].value;
    }
    if (n == 1 || i == 1 || j == 1) {
      dataFilters.splice(idTrTable - 201, 1, editElement);
      tableRender(dataFilters);
    } else {
      dataSlice.splice(idTrTable - 201, 1, editElement);
      tableRender(dataSlice);
    }
    popupEdit.style.display = 'none';
    const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
    dataFormEl.forEach((formEl, index) => {
      countAddALtClick = 1;
      index != 0 ? formEl.remove() : false;
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
    if (i == 1 || j == 1 || n == 1) {
      dataFilters = dataFilters.filter((el) => el.id != matchingId);
      tableRender(dataFilters.filter((el) => el.id != matchingId));
    } else {
      dataSlice = dataSlice.filter((el) => el.id != matchingId);
      tableRender(dataSlice.filter((el) => el.id != matchingId));
    }
  });
}
tableRender(dataSlice);

//Add new inputs in edit popup
btnAddAltEl.addEventListener('click', (e) => {
  e.preventDefault();
  countAddALtClick++;
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
            data-edit-altDel="${countAddALtClick}">
            <span class="icon control-edit delete"></span>
          </div>
        </div>
          <label class="edit-label" data-edit-value="alt${countAddALtClick}">Альтернативное название <input class="edit-inp" type="text" placeholder="Введите альтернативное название №${countAddALtClick}" data-edit-value="alt${countAddALtClick}" /></label>
          <label class="edit-label" data-edit-value="year${countAddALtClick}">Год <input type="number" class="edit-inp year-inp" data-edit-value="alt${
    countAddALtClick - 1
  } maxlength="4" min="1800" max="2400"  placeholder="Введите год" /></label>
      </div>
    </div>`;
  newAltWrapper.insertAdjacentHTML('beforeend', newALtNameFormHTML);
  const delNewAlt = document.querySelectorAll('.js-edit-btn-altDel');
  countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);
  const dataFormEl = document.querySelectorAll('.popup-edit-content-wrapper');
  delNewAlt.forEach((del, indexDel) => {
    dataFormEl.forEach((formEl, indexForm) => {
      del.addEventListener('click', () => {
        countAddALtClick = 0;
        countAddALtClick++;
        countAddALtClick == 6 ? (btnAddAltEl.disabled = true) : (btnAddAltEl.disabled = false);
        indexDel == indexForm && indexForm != 0 ? formEl.remove() : false;
      });
    });
  });
});
//Btn edit
editBtnArr.forEach((edit) => {
  edit.addEventListener('click', () => {
    idTrTable = edit.dataset.valueId;
    popupEdit.style.display = '';
    const closeBtn = document.querySelectorAll('.popup-close');
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
  });
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
  arrFiltersType = [];
  arrSchoolTypeSelect = '';
  checkboxTypeSchoolArr.forEach((checkbox) => {
    checkbox.checked ? arrFiltersType.push(checkbox.dataset.typeFilter) : false;
    checkbox.checked ? (arrSchoolTypeSelect = checkbox.dataset.typeSelect) : false;
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

//Select Reset
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

// Select settings
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
          setTimeout(() => {
            promptEl.dataset.active = 'close';
          }, 100);
        });
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
    }
    btn.addEventListener('click', () => {
      indexInp == indexBtn ? (inp.value = '') : false;
      btn.style.display = 'none';
    });
  });
});

//Btn deselect
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

//Inputs check valid
inpFullName.addEventListener('input', () => {
  let checkVar = dataSlice.some((el) => el.fullName == inpFullName.value);
  if (checkVar == false) {
    inpFullName.dataset.invalid = 'false';
    btnSaveEdit.disabled = false;
    promptEditArr[1].style.display = 'none';
  } else {
    inpFullName.dataset.invalid = 'true';
    btnSaveEdit.disabled = true;
    promptSpanIdArr[1].innerText = dataSlice.find((el) => el.fullName == inpFullName.value).id;
    promptEditArr[1].style.display = 'block';
  }
});
inpInn.addEventListener('input', () => {
  let checkVar = dataSlice.some((el) => el.inn == inpInn.value);
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

//Check page
document.querySelectorAll('.mobile-control__tab-name').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.innerText !== 'АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ'
      ? (main.style.display = 'none')
      : (main.style.display = 'block');
  });
});
document.querySelectorAll('.third-panel__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.innerText.includes('АЛЬТЕР') || tab.classList.contains('more')
      ? (main.style.display = 'block')
      : (main.style.display = 'none');
  });
});

//Empty td hidden in mobile
document.querySelectorAll('.td-alt').forEach((td, indexTd) => {
  document.querySelectorAll('.alt-name').forEach((altEl, indexAlt) => {
    altEl.innerText == '' && indexTd == indexAlt ? td.classList.add('empty') : false;
  });
});

// Render tabName
document.querySelectorAll('.third-panel__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    tab.classList.contains('third-panel__tab_active')
      ? (titlePage.innerText = `Журнал: ${tab.textContent
          .trim()
          .replace(/\s+/g, ' ')
          .slice(1)
          .toUpperCase()}`)
      : false;
  });
});

//Filter Types school
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

//Filter Region
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
  });
});

//Search
searchInput.forEach((inp, indexInp) => {
  btnSearchResetArr.forEach((reset, indexReset) => {
    reset.addEventListener('click', () => {
      selectResetArr.forEach((el) => (el.style.display = 'none'));
      btnSearchResetArr.forEach((el) => (el.style.display = 'none'));
      loopIconsArr.forEach((icon) => (icon.style.display = 'block'));
      document.querySelectorAll('input').forEach((inp) => (inp.value = ''));
      inp.style.padding = '0px 43px 0px 40px';
      n = 0;
      dataFilters = dataSlice;
      tableRender(dataSlice);
    });
    indexReset == indexInp && inp.value == '' ? (reset.style.display = 'none') : false;
  });
});
promptSearchArr.forEach((promptEl) => {
  btnSearchResetArr.forEach((reset) => {
    reset.addEventListener('click', () => {
      promptEl.style.display = 'none';
    });
  });
});
searchInput.forEach((inp, indexInp) => {
  loopIconsArr.forEach((icon, iconIndex) => {
    inp.addEventListener('blur', () => {
      if (iconIndex + 4 == indexInp && inp.value == '') {
        icon.style.display = 'block';
      }
    });
    inp.addEventListener('input', () => {
      inp.value == '' ? (inp.style.padding = '0px 43px 0px 40px') : false;
      if (iconIndex + 4 == indexInp && inp.value != '') {
        icon.style.display = 'none';
        inp.style.padding = '0px 43px 0px 11px';
      }
    });
  });
  promptSearchArr.forEach((promptEl, promptIndex) => {
    inp.addEventListener('blur', () => {
      if (indexInp == promptIndex) {
        setTimeout(() => {
          promptEl.style.display = 'none';
        }, 100);
      }
    });
    inp.addEventListener('input', () => {
      if (indexInp == promptIndex) {
        promptEl.style.display = 'block';
        inp.value == '' ? inp.blur() : false;
        let searchId = inp.dataset.searchValue;
        let valueInput =
          inp.value[0].replace(inp.value[0], inp.value[0].toUpperCase()) + inp.value.slice(1);
        valueInput == '*' ? (valueInput = undefined) : false;
        let valuesSearchHTML = '';
        let regSearch = new RegExp(valueInput, 'gi');
        let regHighlight = new RegExp(valueInput == '//' ? '' : valueInput, 'gi');

        searchId == 'fullName'
          ? (regHighlight = new RegExp(valueInput == '//' ? '' : valueInput, 'g'))
          : false;
        if (i == 1 || j == 1 || n == 1) {
          let textHighlight = '';
          let textOriginal = '';
          let replaceText = '';

          dataFilters = dataFilters
            .filter((el) => String(el[searchId]).match(regSearch))
            .slice(0, 6);
          dataFilters.forEach((el) => {
            textHighlight = String(el[searchId]).match(regHighlight).join('');

            textOriginal = String(el[searchId]).toLowerCase();
            replaceText = textOriginal
              .replace(
                textHighlight.toLowerCase(),
                `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
              )
              .replaceAll(',', '');

            valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
            promptEl.innerHTML = valuesSearchHTML;
          });

          if (valueInput == '') {
            tableRender(dataFilters);
            promptEl.style.display = 'none';
          }
          document.querySelectorAll('.search-value').forEach((el) => {
            el.innerText.includes('UNDEFINED') ? (el.style.color = 'rgba(0, 0, 0, 0)') : false;
            el.addEventListener('click', () => {
              n = 1;
              inp.value = el.textContent;
              valueInput = el.textContent;
              inp.value == 'undefined' ? (inp.style.color = 'rgba(0, 0, 0, 0)') : false;
              regSearch = new RegExp('^' + valueInput, 'gi');
              promptEl.style.display = 'none';
              dataFilters = dataSlice
                .filter((el) => String(el[searchId]).match(regSearch))
                .slice(0, 6);
              tableRender(
                dataSlice.filter((el) => String(el[searchId]).match(regSearch)).slice(0, 6)
              );
            });
          });
        } else {
          let textHighlight = '';
          let textOriginal = '';
          let replaceText = '';
          dataSlice
            .filter((el) => String(el[searchId]).match(regSearch))
            .slice(0, 6)
            .forEach((el) => {
              textHighlight = String(el[searchId]).match(regHighlight).join('');

              textOriginal = String(el[searchId]).toLowerCase();
              replaceText = textOriginal
                .replace(
                  textHighlight.toLowerCase(),
                  `<span class="highlight">${String(el[searchId]).match(regHighlight)}</span>`
                )
                .replaceAll(',', '');
              valuesSearchHTML += `<div class="search-value">${replaceText}</div>`;
              promptEl.innerHTML = valuesSearchHTML;
            });
          if (valueInput == '') {
            promptEl.style.display = 'none';
            tableRender(dataSlice);
          }
          document.querySelectorAll('.search-value').forEach((el) => {
            el.innerText.includes('UNDEFINED') ? (el.style.color = 'rgba(0, 0, 0, 0)') : false;
            el.addEventListener('click', () => {
              n = 1;
              inp.value = el.textContent;
              valueInput = el.textContent;
              inp.value == 'undefined' ? (inp.style.color = 'rgba(0, 0, 0, 0)') : false;
              regSearch = new RegExp('^' + valueInput, 'gi');
              promptEl.style.display = 'none';
              dataFilters = dataSlice
                .filter((el) => String(el[searchId]).match(regSearch))
                .slice(0, 6);
              tableRender(dataSlice.filter((el) => String(el[searchId]).match(regSearch))).slice(
                0,
                6
              );
            });
          });
          tableRender(dataSlice.filter((el) => String(el[searchId]).match(regSearch)).slice(0, 6));
          valueInput == '' ? tableRender(dataSlice) : false;
        }
      }
    });
  });
});

//POPUPS
//export
exportBtnEl.addEventListener('click', () => {
  popupExport.style.display = '';
  const closeBtn = document.querySelectorAll('.popup-close');
  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      popupExport.style.display = 'none';
    });
  });
});
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
