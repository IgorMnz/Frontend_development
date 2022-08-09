function tabs(tabsSelector, tabsContentSelector, tabParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabParentSelector);

    //Добавляем функцию которая будет добавлять класс hide и удалять класс show для каждой найденной вкладки:
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    } //i = 0 это дефолтное значение, то есть начинаем с 0 элемента
    
    hideTabContent();
    showTabContent(); 

    //Создаем обработчик событий который будет по клику на вкладки запускать наши функиции:
    tabsParent.addEventListener('click', (event) => {
        const target = event.target; //для простоты испльзования

        //Так как в tabsSelector нам приходит строка с точкой вначале '.tabheader__item' мы с помощью метода slice отрезаем первый символ:
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);               
                } //проверка на то, что пользователь кликнул именно на тот таб который перебирается в данный момент

            });
        }
    });
}

export default tabs;