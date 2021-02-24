let myMap;
let formTemplateNode = document.getElementById('form-template');

ymaps.ready(init);


function setDataToMap() {

    //пробовал вытащить коменты по координатам передаваемых в ключе, не вышло, так же не сохраняются метки на карте,
    //то есть если в ключе строка типа 'reviews' как было у нас после созвона, то метка остается но каждый раз заменяется.

    // const data = JSON.parse(localStorage.reviews);
    //
    //
    // createPlacemark(data.coords)

    // get reviews from localStorage
    // loop reviews and set marker to map
}

function init() {
    myMap = new ymaps.Map("map", {
        center: [59.93, 30.30],
        zoom: 12,
        controls: ['zoomControl', 'searchControl']
    })

    addListeners();
    setDataToMap();
}

function createPlacemark(coords) {
    const myPlacemark = new ymaps.Placemark(coords, {
        hintContent: 'Собственный значок метки',
    }, {
        iconImageSize: [30, 42],
        iconImageOffset: [-5, -38],
    });
    myPlacemark.events.add('click', (event) => {
        const coords = event.get('target').geometry.getCoordinates();  // здесь получаю координаты при клике на метку, для открытия балуна,
        // планировалось в балун закидывать данные по координатам в ключе localstorage
        openBalloon(coords, formTemplateNode.innerHTML)
        addComment()
    });
    myMap.geoObjects.add(myPlacemark);
}

function addComment() {     // хотел написать функцию для добавления коммента в шапку балуна, не присваиваются значения localstorage,
                             //   для этого сделал еще scrypt template для li которую планировал вставлять.
    const reviewItem = document.getElementById('review-item');
    const reviewName = document.getElementById('review-name');
    const reviewPlace = document.getElementById('review-place');
    const reviewText = document.getElementById('review-text');


    const data = JSON.parse(localStorage.reviews);

    console.log(data.name);

    reviewName.value = data.name
    reviewPlace.value = data.place
    reviewText.value = data.text

    formTemplateNode.insertAdjacentHTML('afterbegin', reviewItem.innerHTML);

}


function openBalloon(coords, data) {
    myMap.balloon.open(coords, data);
}

function closeBalloon() {
    myMap.balloon.close();
}


function addListeners() {
    let coords;
    myMap.events.add('click', (event) => {
        coords = event.get('coords');
        openBalloon(coords, formTemplateNode.innerHTML);
    })
    document.body.addEventListener('click', (event) => {
        if (event.target.id === 'submit-review-button') {
            event.preventDefault();
            const errorNode = document.getElementById('error');
            errorNode.style.display = 'none';
            const formReviewName = document.getElementById('form-review-name');
            const formReviewPlace = document.getElementById('form-review-place');
            const formReviewText = document.getElementById('form-review-text');
            const formValues = [formReviewName.value, formReviewPlace.value, formReviewText.value]
            const isFormValid = formValues.every(value => value.trim().length > 0);
            if (isFormValid) {
                const data = {
                    name: formReviewName.value,
                    place: formReviewPlace.value,
                    text: formReviewText.value,
                    coords: coords,
                }
                // const reviewItem = document.getElementById('review-item');
                // const reviewName = document.getElementById('review-name');
                // const reviewPlace = document.getElementById('review-place');
                // const reviewText = document.getElementById('review-text');

                // reviewName.value = formReviewName.value
                // reviewPlace.value = formReviewPlace.value
                // reviewText.value = formReviewText.value


                // console.log(reviewItem);

                window.localStorage.setItem(coords, JSON.stringify(data)); //здесь пробовал передавать в ключ координаты ,
                //координаты принимает но данные по такому ключу не вытащить.
                closeBalloon();
                createPlacemark(coords);
            } else {
                errorNode.style.display = 'block';
            }
        }
    })
    /*let nameGet;
    let targetGet;
    let commentGet;
    let reviewList = document.getElementById('review__list')
    const form = document.getElementById('review')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        nameGet = review.elements.nameForm.value;
        targetGet = review.elements.targetForm.value;
        commentGet = review.elements.commentForm.value;
        console.log(nameGet, targetGet, commentGet);
        reviewList.insertAdjacentHTML('afterbegin', '<li class="review__item"><div class="review__item--row"><span class="review__item--name" id="nameTake"></span><span class="review__item--target" id="targetTake"></span></div><div class="review__item--text" id="commentTake"></div></li>')
        nameTake.textContent = nameGet;
        targetTake.textContent = targetGet;
        commentTake.textContent = commentGet;
        modal.style.display = 'none'
        myMap.geoObjects.add(myPlacemark)
        review.reset()
    })*/
}


/*
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
})*/
