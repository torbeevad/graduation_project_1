let myMap;
let coords;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.30],
        zoom: 12,
        controls: ['zoomControl', 'searchControl']
    })

        addListeners()
}

function addListeners() {
    myMap.events.add('click', (event) => {
        coords = event.get('coords');
        myPlacemark = new ymaps.Placemark(coords, {
            hintContent: 'Собственный значок метки',
            balloonContent: '<li class="review__item" id="review__item">\n' +
                '                <div class="review__item--row">\n' +
                '                    <span class="review__item--name" id="review__item--name"></span>\n' +
                '                    <span class="review__item--target" id="review__item--target"></span>\n' +
                '                </div>\n' +
                '            <div class="review__item--text" id="review__item--text"></div>\n' +
                '            </li>'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/dev/images/pin.svg',
            // Размеры метки.
            iconImageSize: [42, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-21, -42]
        })
        openModal(event)
    })

    const form = document.getElementById('review')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        review.reset()
        modal.style.display = 'none'
        myMap.geoObjects.add(myPlacemark)
    })
}

function openModal(event) {

    let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX
    let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY

    const modal = document.getElementById('modal')


    modal.style.display = 'block'
    modal.style.top = `${posY}px`
    modal.style.left = `${posX}px`
}

const close = document.getElementById('close')
close.addEventListener("click", () => {
    review.reset()
    modal.style.display = 'none'
})



