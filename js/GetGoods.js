const getgoods = () => {

    //функция получения данных с сервера----------------------------------------------
    const getdata = () => {
        fetch('/db/db.json')//запрос к серверу(файлу)
            .then((res) => res.json())//получаем данные и преобразуем
            .then((data) => {
                localStorage.setItem('goods', JSON.stringify(data));
            })
    }
    //обработка событий при клике на каждую ссылку-----------------------------------
    const links = document.querySelectorAll('.navigation-link');//получаем ссылки на товары   
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            getdata();
        })
    })


    /*localStorage.setItem('goods', JSON.stringify({ name: 'all' }));//запись элемента хранилище

    const goods = (JSON.parse(localStorage.getItem('goods')));//получение элемента из хранилища

    localStorage.removeItem('goods');*///удаление элемента из хранилища

}

getgoods() 