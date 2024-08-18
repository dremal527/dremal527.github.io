import { tableRender } from './units/tableRender.js';
tableRender();
window.addEventListener('resize', () => {
  tableRender();
});
const selectElArr = document.querySelectorAll('.main__select');
const selectArrowArr = document.querySelectorAll('.btn-select');
const selectResetArr = document.querySelectorAll('.btn-select-reset');
const promptArr = document.querySelectorAll('.prompt-filter');
const btnApplyArr = document.querySelectorAll('.btn-apply-filter');
const searchInput = document.querySelectorAll('.input-search');
const btnSearchResetArr = document.querySelectorAll('.btn-reset-search');

const exportBtnEl = document.querySelector('.js-popup-export');
const popupExport = document.querySelector('.export');

const editBtnArr = document.querySelectorAll('.edit-btn');
const popupEdit = document.querySelector('.popup-edit');

const delBtnArr = document.querySelectorAll('.del-btn');
const popupDel = document.querySelector('.popup-delete');

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

let countClick = 0;
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
        select.addEventListener('blur', () => {
          select.dataset.active = 'close';
          arrow.dataset.active = 'close';
          promptEl.dataset.active = 'close';
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
