import { data } from '../data/data.js';
let scrollPosition;
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;
  localStorage.setItem('pos', scrollPosition);
});

let scroll = JSON.parse(localStorage.getItem('pos'));
window.onload = () => {
  window.scrollTo({ top: scroll });
};
let dataSlice = data.slice(0, 50);
function checkUndef(prop) {
  if (prop === undefined) {
    return '';
  } else return prop;
}
function tableRender(dataValue) {
  const tbodyWrapperEl = document.querySelector('.tr-wrapper');
  const tableWrapperEl = document.querySelector('.table_desktop__wrapper');

  tbodyWrapperEl.innerHTML = '';

  dataValue.forEach((school) => {
    return (tbodyWrapperEl.innerHTML += `
      <tr class="tr-school" data-value-id="${school.id}">
        <td>
          <p>${school.id - 200}</p>
          <p class="table__value__id">${school.id}</p>
        </td>
        <td class="td-wrapper-icon">
          <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${school.id}">
            <span class="icon control-edit edit" ></span>
          </div>
        </td>
        <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить" data-value-id="${
            school.id
          }" data-full-name="${school.fullName}">
            <span class="icon control-edit delete"></span>
          </div>
        </td>
        <td>
          <p>${checkUndef(school.inn)}</p>
          <p>${checkUndef(school.abbr)}</p>
          <p class="table__year">${checkUndef(school.year)}</p>
        </td>
        <td>
          ${school.fullName}
        </td>
        <td>
          <p>${checkUndef(school.alt1)}</p>
          <p class="table__year">${checkUndef(school.year1)}</p>
        </td>
        <td>
          <p>${checkUndef(school.alt2)}</p>
          <p class="table__year">${checkUndef(school.year2)}</p>
        </td>
        <td>
          <p>${checkUndef(school.alt3)}</p>
          <p class="table__year">${checkUndef(school.year3)}</p>
        </td>
        <td>
          <p>${checkUndef(school.alt4)}</p>
          <p class="table__year">${checkUndef(school.year4)}</p>
        </td>
        <td>
          <p>${checkUndef(school.alt5)}</p>
          <p class="table__year">${checkUndef(school.year5)}</p>
        </td>
        <td>
          <p>${checkUndef(school.alt6)}</p>
          <p class="table__year">${checkUndef(school.year6)}</p>
        </td>
      </tr>
      `);
  });
}
function tableRenderMobile(dataValue) {
  const tableMobileWrapper = document.querySelector('.table_mobile__wrapper');
  tableMobileWrapper.innerHTML = '';
  let styleMobile = `
      <style>
       
    </style>`;
  dataValue.forEach((school, index) => {
    tableMobileWrapper.innerHTML += `
      <table class="table_mobile" data-value-id="${school.id}" cellspacing="0" cellspadding="0">
        <tr>
          <td colspan="8">${school.fullName}</td>
          <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${
              school.id
            }">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">№</td>
          <td colspan="6">${index + 1}</td>
        </tr>
        <tr>
          <td colspan="2">
            <p>Абревиатура</p>
            <p>ИНН</p>
            <p>Год</p>
          </td>
          <td colspan="6">
            <p>${checkUndef(school.abbr)}</p>
            <p>${checkUndef(school.inn)}</p>
            <p>${checkUndef(school.year)}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">Полное название</td>
          <td colspan="6">
            ${school.fullName}
          </td>
        </tr>
        <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
            <p>${checkUndef(school.alt1)}</p>
            <p>${checkUndef(school.year1)}</p>
          </td>
        </tr>
         <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
            <p>${checkUndef(school.alt2)}</p>
            <p>${checkUndef(school.year2)}</p>
          </td>
        </tr>
         <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
            <p>${checkUndef(school.alt3)}</p>
            <p>${checkUndef(school.year3)}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
             <p>${checkUndef(school.alt4)}</p>
            <p>${checkUndef(school.year4)}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
           <p>${checkUndef(school.alt5)}</p>
            <p>${checkUndef(school.year5)}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">Альтернативное название</td>
          <td colspan="6">
          <p>${checkUndef(school.alt6)}</p>
            <p>${checkUndef(school.year6)}</p>
          </td>
        </tr>
        <tr class="tr-edit">
           <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать" data-value-id="${
              school.id
            }">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить" data-value-id="${school.id}">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
      </table>
    `;
  });
}
tableRender(dataSlice);
tableRenderMobile(dataSlice);
const selectElArr = document.querySelectorAll('.main__select');
const selectArrowArr = document.querySelectorAll('.btn-select');
const selectResetArr = document.querySelectorAll('.btn-select-reset');
const promptArr = document.querySelectorAll('.prompt-filter');
const btnApplyArr = document.querySelectorAll('.btn-apply-filter');
const searchInput = document.querySelectorAll('.input-search');
const btnSearchResetArr = document.querySelectorAll('.btn-reset-search');
const schoolTrElArr = document.querySelectorAll('.tr-school');
const exportBtnEl = document.querySelector('.js-popup-export');
const popupExport = document.querySelector('.export');
const btnDeleteTr = document.querySelector('.btn-delete');
const editBtnArr = document.querySelectorAll('.edit-btn');
const popupEdit = document.querySelector('.popup-edit');

const delBtnArr = document.querySelectorAll('.del-btn');
const popupDel = document.querySelector('.popup-delete');
const schoolIdEl = document.querySelector('.school-id');
const schoolFullNameEl = document.querySelector('.school-name');

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
console.log(delBtnArr);
setInterval(console.log(delBtnArr), 3000);
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
btnDeleteTr.addEventListener('click', () => {
  schoolTrElArr.forEach((tr) => {
    tr.dataset.valueId == btnDeleteTr.dataset.valueId ? tr.remove() : false;
    popupDel.style.display = 'none';
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

selectElArr.forEach((select, indexSelect) => {
  selectResetArr.forEach((reset, indexReset) => {
    if (indexReset == indexSelect) {
      select.addEventListener('input', () => {
        reset.style.display = 'block';
      });
    }
    reset.addEventListener('click', () => {
      indexReset == indexSelect ? (select.value = '') : false;
      reset.style.display = 'none';
    });
  });
  promptArr.forEach((promptEl, indexPrompt) => {
    selectArrowArr.forEach((arrow, indexArrow) => {
      if (indexArrow == indexSelect && indexSelect == indexPrompt) {
        btnApplyArr.forEach((btn, indexBtn) => {
          if (indexBtn == indexSelect) {
            btn.addEventListener('click', () => {
              select.dataset.active = 'close';
              arrow.dataset.active = 'close';
              promptEl.dataset.active = 'close';
            });
          }
        });
        select.addEventListener('click', () => {
          select.dataset.active = 'open';
          arrow.dataset.active = 'open';
          promptEl.dataset.active = 'open';
        });
      }
    });
  });
});
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
function bySort(sortPar) {
  return (a, b) => (a[sortPar] > b[sortPar] ? 1 : -1);
}
function bySortRev(sortPar) {
  return (a, b) => (a[sortPar] < b[sortPar] ? 1 : -1);
}
let counter = 0;
document.querySelectorAll('.sort-table').forEach((sort) => {
  sort.addEventListener('click', () => {
    counter++;
    let sortValues = sort.dataset.sortValue;
    let sortData;

    if (counter % 2 == 0) {
      sortData = dataSlice.sort(bySortRev(sortValues));
      tableRender(sortData);
      console.log(delBtnArr);
    } else {
      sortData = dataSlice.sort(bySort(sortValues));
      tableRender(sortData);
    }
  });
});
const inputArr = document.querySelectorAll('input');
document.querySelector('.js-btn-deselect').addEventListener('click', () => {
  inputArr.forEach((inp) => {
    inp.value = '';
    selectResetArr.forEach((reset) => (reset.style.display = 'none'));
    btnSearchResetArr.forEach((reset) => (reset.style.display = 'none'));
  });
});
