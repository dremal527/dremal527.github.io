export function tableRender() {
  const tableWrapperEl = document.querySelector('.table__wrapper');

  let style = ``;
  if (window.innerWidth <= 880) {
    style = `
      <style>
        .table_mobile {
          border: 1px solid #cbcbcb;
          margin: 38px 0px 32px 0px;
          padding: 0;
          border-collapse: collapse;
          color: #484848;
          width: 100%;
          font-size: 16px;
        }
        .table_mobile:last-child {
          margin-bottom: 80px;
        }
          tr:first-child > td {
          background-color: #ebf6f9;
          border-bottom: 1px solid #cbcbcb;
          color: #414141;
          padding: 15px 16px !important;
        }
        tr:first-child > td:first-child {
          padding: 15px 0px 15px 16px !important;
          font-size: 20px;
        }

        td:first-child {
          color: #9c9c9c;
        }
        tr:first-child > td:first-child {
        }
        td > svg {
          width: 25px;
          height: 25px;
        }
        td {
          padding: 16px 16px 16px 20px;
        }
    </style>`;
    return (tableWrapperEl.innerHTML = `  
    ${style}
      <table class="table_mobile">
        <tr>
          <td colspan="4">Название учебного заведения № 1</td>
          <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
        <tr>
          <td>№</td>
          <td colspan="3">2</td>
        </tr>
        <tr>
          <td>
            <p>Абревиатура</p>
            <p>ИНН</p>
            <p>Год</p>
          </td>
          <td colspan="3">
            <p>ННГАСУ</p>
            <p>52600002707</p>
            <p>1997</p>
          </td>
        </tr>
        <tr>
          <td>Полное название</td>
          <td colspan="3">
            Нижегородский государственный архитектурно-строительный университет, Нижний Новгород
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НАСА</p>
            <p>1993</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НАСИ</p>
            <p>1991</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>ГИСИ им. В.П. Чкалова</p>
            <p>1938</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НИСИ</p>
            <p>1932</p>
          </td>
        </tr>
        <tr class="tr-edit">
           <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
      </table>
      <table class="table_mobile">
        <tr>
          <td colspan="4">Название учебного заведения № 1</td>
          <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
        <tr>
          <td>№</td>
          <td colspan="3">2</td>
        </tr>
        <tr>
          <td>
            <p>Абревиатура</p>
            <p>ИНН</p>
            <p>Год</p>
          </td>
          <td colspan="3">
            <p>ННГАСУ</p>
            <p>52600002707</p>
            <p>1997</p>
          </td>
        </tr>
        <tr>
          <td>Полное название</td>
          <td colspan="3">
            Нижегородский государственный архитектурно-строительный университет, Нижний Новгород
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НАСА</p>
            <p>1993</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НАСИ</p>
            <p>1991</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>ГИСИ им. В.П. Чкалова</p>
            <p>1938</p>
          </td>
        </tr>
        <tr>
          <td>Альтернативное название</td>
          <td colspan="3">
            <p>НИСИ</p>
            <p>1932</p>
          </td>
        </tr>
        <tr class="tr-edit">
           <td class="td-wrapper-icon">
            <div class="table-icon edit-btn" data-value="Редактировать">
              <span class="icon control-edit edit"></span>
            </div>
          </td>
          <td class="td-wrapper-icon">
          <div class="table-icon del-btn" data-value="Удалить">
            <span class="icon control-edit delete"></span>
          </div>
          </td>
        </tr>
      </table>
  `);
  } else if (window.innerWidth > 880) {
    style = `
    <style>
      table {
        margin: 38px 0px 50px 0px;
        width: 100%;
        color: #484848;
        font-size: 20px;
        line-height: 137.02%;
      }
      td {
        padding: 11px 13px;
        outline: 2px solid #cbcbcb;
        position: relative;
      }
      svg {
        width: 25px;
        height: 25px;
      }
      tr:nth-child(1) {
        height: 25px;
        color: #9c9c9c;
        font-size: 20px;
        line-height: 137.02%;
      }
      tr:nth-child(2) {
        height: 25px;
      }
      tr:nth-child(2) > td > svg {
        width: 20px;
        height: 20px;
      }
      tr {
        height: 200px;
        vertical-align: sub;
      }
      .table__year,
      .table__value__id {
        position: absolute;
        bottom: 10%;
      }
      .table__value__id {
        left: 7.5px;
      }
      td:nth-child(2),
      td:nth-child(3) {
        text-align: center;
        width: 44px;
      }
      td:nth-child(1) {
        text-align: center;
        width: 10px;
      }
      td:nth-child(4) {
        width: 190px;
      }
      td:nth-child(5) {
        width: 410px;
      }
      .td-wrapper-icon {
        vertical-align: middle;
      }
      .table-icon > * {
        width: 32px;
        height: 32px;
      }
      td:nth-child(6),
      td:nth-child(7),
      td:nth-child(8),
      td:nth-child(9) {
        width: 200px;
    }
  </style>
  `;
    return (tableWrapperEl.innerHTML = `
      ${style}
       <table>
            <tr>
              <td>№ ID</td>
              <td>EDIT</td>
              <td>DEL</td>
              <td>Аббревиатура ИНН, Год</td>
              <td>Полное название</td>
              <td colspan="4">Альтернативные названия</td>
            </tr>
            <tr>
              <td>
                <span class="icon loop"></span>
                <input type="number" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td></td>
              <td></td>
              <td>
                <span class="icon loop"></span>    
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td>
                <span class="icon loop"></span>
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td>
                <span class="icon loop"></span>
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td>
                <span class="icon loop"></span>
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td>
                <span class="icon loop"></span>
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
              <td>
                <span class="icon loop"></span>
                <input type="text" class="input-search table" />
                <button class="btn-reset-search"><span class="litle-cross icon"></span></button>
              </td>
            </tr>
            <tr>
              <td>
                <p>1</p>
                <p class="table__value__id">212</p>
              </td>
              <td class="td-wrapper-icon">
                <div class="table-icon edit-btn" data-value="Редактировать">
                 <span class="icon control-edit edit"></span>
                </div>
              </td>
              <td class="td-wrapper-icon">
                <div class="table-icon del-btn" data-value="Удалить">
                  <span class="icon control-edit delete"></span>
                </div>
              </td>
              <td>
                <p>ННГАСУ</p>
                <p>5260002707</p>
                <p class="table__year">1997</p>
              </td>
              <td>
                Нижегородский государственный архитектурно-строительный университет, Нижний Новгород
              </td>
              <td>
                <p>НАСА</p>
                <p class="table__year">1993</p>
              </td>
              <td>
                <p>НАСИ</p>
                <p class="table__year">1991</p>
              </td>
              <td>
                <p>ГИСИ им. В.П. Чкалова</p>
                <p class="table__year">1938</p>
              </td>
              <td>
                <p>НИСИ</p>
                <p class="table__year">1932</p>
              </td>
            </tr>
            <tr>
              <td>
                <p>1</p>
                <p class="table__value__id">212</p>
              </td>
              <td class="td-wrapper-icon">
                <div class="table-icon edit-btn" data-value="Редактировать">
                 <span class="icon control-edit edit"></span>
                </div>
              </td>
              <td class="td-wrapper-icon">
                <div class="table-icon del-btn" data-value="Удалить">
                 <span class="icon control-edit delete"></span>
                </div>
              </td>
              <td>
                <p>ННГАСУ</p>
                <p>5260002707</p>
                <p class="table__year">1997</p>
              </td>
              <td>
                Нижегородский государственный архитектурно-строительный университет, Нижний Новгород
              </td>
              <td>
                <p>НАСА</p>
                <p class="table__year">1993</p>
              </td>
              <td>
                <p>НАСИ</p>
                <p class="table__year">1991</p>
              </td>
              <td>
                <p>ГИСИ им. В.П. Чкалова</p>
                <p class="table__year">1938</p>
              </td>
              <td>
                <p>НИСИ</p>
                <p class="table__year">1932</p>
              </td>
            </tr>
          </table>
      `);
  }
}
