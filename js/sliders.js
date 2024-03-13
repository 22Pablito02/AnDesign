const oneSwiper = new Swiper('.oneSwiper', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 5000,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
    },
});


const twoSwiper = new Swiper('.twoSwiper', {
    direction: 'horizontal',
    loop: false,
    allowTouchMove: false,
    autoHeight: true,
    navigation: {
        nextEl: '.s-button-next',
        prevEl: '.s-button-prev'
    },
})

