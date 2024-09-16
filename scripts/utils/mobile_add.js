

(
    () => {
        console.log('xp[')
        
        document.querySelectorAll('.third-panel__tab:not(.more)').forEach(el => {
            function handle_click(){
                console.log('click')
                document.querySelectorAll('.mobile-control-wrapper__grid-nav').forEach(m => {
                document.querySelector('.title-page__wrapper').textContent = `Журнал: ${el.querySelector('p').textContent.toUpperCase()}`

                localStorage.setItem('pc_active_item', `${el.querySelector('p').textContent.toLowerCase()}`)
                localStorage.setItem('active_tab', `${el.querySelector('p').textContent.toLowerCase()}`)
                  })

                  
                
                // const bradCrumbsItemTextControl = document.querySelector(
                // ".brad-crumb__item__text"
                // );

                // bradCrumbsItemTextControl.innerHTML = `ЖУРНАЛ ${el.querySelector('p').textContent.toUpperCase()}`;

            }
            el.addEventListener('click', handle_click)
        
        })

        document.querySelectorAll('.second-panel__tab').forEach(el => {
            const t = el.querySelector('p').textContent;
            el.addEventListener('click', () => {
                if(t !== 'Журналы') {
                    document.querySelector('.title-page__wrapper').style = 'display: none'
                } else {
                    document.querySelector('.title-page__wrapper').style = ''
                    document.querySelector('.title-page__wrapper').textContent = 'Журнал: АЛЬТЕРНАТИВНЫЕ УЧЕБНЫЕ ЗАВЕДЕНИЯ'
                }
            })
        })
    })()