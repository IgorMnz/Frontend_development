function slider({container, slide, nextArrow, prevArrow, totalCuinter, currentCounter, wrapper, field}) {
    //Slider

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCuinter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; 
    
    //Создаем и устанавливаем индекс для слайдера:
    let slideIndex = 1;  
    //Чтобы знать на соклько мы отсутпили вправо или влево с помощью transorm
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //Установим ширину блоку (чтобы все слайды разместились в один ряд по ширине) как 400% (так как 4 слайда) от своего родителя (offer__slider-wrapper):
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    //Огриничим показ в блоке offer__slider-wrapper чтобы был виден только один слайд
    slidesWrapper.style.overflow = 'hidden';

    //Так как слайды могут быть разной ширины, мы перебираем все слайды и устанавливаем им ту ширину которая есть в computed style у блока который показывает нам текущий слайд:
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    slider.append(indicators);

    //Создаем функцию которая изменяет прозрачность точек переключения сладов
    function showActiveDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1; 
    }

    //Создаем функцию которая для чисел показывающих текущее и общее кол-во слайдов добавляет 0 если это число до 10
    function addZero() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    } 

    next.addEventListener('click', () => {
        //Вычисялем ширину offset на которую нам надо будет потом переместиться вправо(так как у нас из width приходит '650px' мы с помощью регулярных выражений находим все не числа и заменяем их на пустую строку, то есть отбрасываем)
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        //Перемещаем вправо на вычисленное значение offset
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addZero();

        showActiveDots();
    });

    prev.addEventListener('click', () => {
        //Делаем наоборот сперва проверяем если  
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        //Перемещаем вправо или влево на вычисленное значение offset
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1); 

            slidesField.style.transform = `translateX(-${offset}px)`;

            addZero();

            showActiveDots();
        });
    });


    //Варинат более простого слайдера:

    // //Вызываем функцию чтобы показать изначайный слайд и скрыть все остальные слайды 
    // showSlides(slideIndex);

    // //Показываем общее кол-во слайдов (в числах до 10 прописываем вначале 0) (если прописать это условие в самой функции то у нас при переключении слайдов цифра с общим кол-вом слайдов будет обновляться и мигать):
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
 
    // //Создаем функцию в котрой как аргумент будет приходить наш slideIndex с текущим номером
    // function showSlides(n) {
    //     //Проверяем если индекс слайда будет больше чем кол-во слайдов которые есть у нас в верстке то мы перемещаеся в самое начало:
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     //Проверяем, если мы из начального слайда перемаемся в предыдущий, т.е. в самый конец то мы устанавливаем ему последнее значение
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     //Скрываем все слайды которые есть и показываем текущий:
    //     slides.forEach(item => item.style.display = 'none');

    //     //Обращаеся к найденному псевдомассиву и для (Номер элемента - 1) так как  у нас slideIndex начинается с 1 а не с 0 как в массиве
    //     slides[slideIndex - 1].style.display = 'block';
        
    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // //Создаем функцию для переключения слайдера котороая принимает как аргумент наш slideIndex и вызывавет функцию showSlides. К нам приходит n = -1 если мы нажимаем на срелку prev и приходит n = 1 если нажимаем на next
    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // //Добавляем обработчики событий для кнопок слайдера:
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });
}

export default slider;