let myMap;
let coords;
ymaps.ready(init);

function init() {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.30],
        zoom: 12,
        controls: ['zoomControl']
    }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Собственный значок метки',
            balloonContent: 'Это красивая метка'
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
    myMap.geoObjects.add(myPlacemark)
    addListeners()
}

function addListeners() {

    openModal()
}


function openModal() {
    myMap.events.add('click', (event) => {

        let posX = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientX
        let posY = event.getSourceEvent().originalEvent.domEvent.originalEvent.clientY

        const modal = document.getElementById('modal')

        coords = event.get('coords');

        modal.style.display = 'block'
        modal.style.top = `${posY}px`
        modal.style.left = `${posX}px`
    })
    const form = document.getElementById('rewiew')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}
