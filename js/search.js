const search = function () {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');
    /*input.addEventListener('input', (event) => {
        console.log(event.target.value);
    })*/
    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');//получаем класс карточек

        goodsContainer.innerHTML = '';//очищаем страницу

        goods.forEach(good => {
            const goodBlock = document.createElement('div');//создаем новый блок div
            goodBlock.classList.add('col-lg-3');//добавляем новый класс к блоку
            goodBlock.classList.add('col-sm-6');//добавляем новый класс к блоку
            //вставляем карточки на страницу с помощью верстки------------------------------------
            goodBlock.innerHTML = `
                    <div class="goods-card">
						<span class="label ${good.label ? null : 'd-none'}">${good.label}</span> 

						<img src="db/${good.img}" alt="${good.name}" class="goods-image">

						<h3 class="goods-title">${good.name}</h3>

						<p class="goods-description">${good.description}</p>

						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">

							<span class="button-price">$${good.price}</span>

						</button>
					</div>
            `
            goodsContainer.append(goodBlock);//доблавяем в конец страницы готовый созданный div---
        })
    }

    //функция получения данных с сервера----------------------------------------------------------
    const getdata = (value) => {
        fetch('/db/db.json')//запрос к серверу(файлу)
            .then((res) => res.json())//получаем данные и преобразуем
            .then((data) => {
                const array = data.filter(good => {

                    return good.name.toLowerCase().includes(value.toLowerCase());//ищем карточки по значению инпута
                })

                localStorage.setItem('goods', JSON.stringify(array));//записываем в локальное хранилище отфильтрованный массив данных                           

                if (window.location.pathname !== '/goods.html') { //условие для перехода на страницу с товарами
                    window.location.href = '/goods.html';// переход на страницу с товарами
                } else {
                    renderGoods(array);//рендер товаров
                }
            })
    }

    searchBtn.addEventListener('click', () => {
        getdata(input.value);
    })


}

search();