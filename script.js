/* Scroll observer */

// The debounce function receives our function as a parameter
const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;

    // The debounce function returns a new function that can receive a variable number of arguments
    return (_) => {

        // If the frame variable has been defined, clear it now, and queue for next frame
        if (frame) {
            cancelAnimationFrame(frame);
        }

        // Queue our function call for the next frame
        frame = requestAnimationFrame(() => {

            // Call our function and pass any params we received
            fn();
        });

    }
};


// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

$(function () {

    // let lang = localStorage.getItem('lang');
    let lang = 'en';

    if (!!lang) { // if language is already set setup from local storage variable

        if (/^ar\b/.test(lang)) { // if setted

            document.body.style.direction = 'rtl'; // if arabic then change direction to rtl

            lang = 'ar'; // set language button text

            // 4 is for RTL style and 5 for LTR
            document.styleSheets[5].disabled = false;
            document.styleSheets[4].disabled = true;

        } else {

            document.body.style.direction = 'ltr';

            lang = lang.toLocaleUpperCase(); //change it to uppercase for langauge button text

            document.styleSheets[5].disabled = true;
            document.styleSheets[4].disabled = false;

        }

    } else if (/^ar\b/.test(navigator.language)) { // if language not set yet then look for language in navigator.language

        document.body.style.direction = 'rtl'; // if arabic then change direction to rtl

        lang = 'ar'; // set language button text

        // 4 is for RTL style and 5 for LTR
        document.styleSheets[5].disabled = false;
        document.styleSheets[4].disabled = true;

    } else if (/^fr\b/.test(navigator.language)) {
        document.body.style.direction = 'ltr';
        lang = 'fr'.toLocaleUpperCase();
        document.styleSheets[5].disabled = true;
        document.styleSheets[4].disabled = false;
    } else {
        /* Stored language */
        document.body.style.direction = 'ltr';
        lang = 'eng'.toLocaleUpperCase();
        document.styleSheets[5].disabled = true;
        document.styleSheets[4].disabled = false;
    }

    /* language button */
    document.getElementsByClassName('language')[0].textContent = document.getElementsByClassName('language')[1].textContent = lang === 'ar' ? 'ض' : lang;


    // Loading language
    $.getJSON('./assets/language/' + lang.toLocaleLowerCase() + '.json', function (res) {

        let translation = Object.values(res);

        console.log(translation);

        let elements = $('.translate');

        for (let i = 0; i < 7; i++) {
            elements[i].innerHTML = translation[i];
            elements[i + 7].innerHTML = translation[i];
        }

        for (let i = 7; i < translation.length; i++) {

            // for contact us inputs placeholder
            if (i === 45 || i === 38 || i === 39)
                elements[i + 7].placeholder = translation[i];
            else
                elements[i + 7].innerHTML = translation[i];
        }


    });

    // on scroll animations
    var wow = new WOW(
        {
            boxClass: 'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 70,          // distance to the element when triggering the animation (default is 0)
            mobile: false,       // trigger animations on mobile devices (default is true)
            live: false,       // act on asynchronously loaded content (default is true)
            callback: function (box) {
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );
    wow.init();

    /* contact us role dropdown */
    $('.dropdown > .caption').on('click', function () {
        $(this).parent().toggleClass('open');
    });

    $('.dropdown > .list > .item').on('click', function () {
        $('.dropdown > .list > .item').removeClass('selected');
        $(this).addClass('selected').parent().parent().removeClass('open').children('.caption').text($(this).text());
    });

    $(document).on('keyup', function (evt) {
        if ((evt.keyCode || evt.which) === 27) {
            $('.dropdown').removeClass('open');
        }
    });

    $(document).on('click', function (evt) {
        if ($(evt.target).closest(".dropdown > .caption").length === 0) {
            $('.dropdown').removeClass('open');
        }
    });

    /* Owl carousel testimonial */
    $('.owl-carousel').owlCarousel({
        stagePadding: 20,
        loop: false,
        margin: 0,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    /* scroll navigation */
    $.scrollIt({
        topOffset: -52,
        onPageChange: () => {
            closeNav();
        },
    });
});

/* SideNav */
var isOpen = false;

function toggleSideNav() {
    if (isOpen) {
        closeNav();
    } else {
        openNav();
    }
}

/* Open the sidenav */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    isOpen = true;
}

/* Close/hide the sidenav */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    isOpen = false;
}

function changeLang(lang) {

    /* Store language */
    localStorage.setItem('lang', lang);
    // Loading language
    $.getJSON('./assets/language/' + lang + '.json', function (res) {

        let translation = Object.values(res);

        console.log(translation);

        let elements = $('.translate');

        for (let i = 0; i < 7; i++) {
            elements[i].innerHTML = translation[i];
            elements[i + 7].innerHTML = translation[i];
        }

        for (let i = 7; i < translation.length; i++) {

            // for contact us inputs placeholder
            if (i === 45 || i === 38 || i === 39)
                elements[i + 7].placeholder = translation[i];
            else
                elements[i + 7].innerHTML = translation[i];
        }
    });


    if (/^ar\b/.test(lang)) { // if setted

        document.body.style.direction = 'rtl'; // if arabic then change direction to rtl

        lang = 'ض'; // set language button text

        // 4 is for RTL style and 5 for LTR
        document.styleSheets[5].disabled = false;
        document.styleSheets[4].disabled = true;

    } else {

        document.body.style.direction = 'ltr';

        lang = lang.toLocaleUpperCase(); //change it to uppercase for langauge button text

        document.styleSheets[5].disabled = true;
        document.styleSheets[4].disabled = false;

    }

    /* language button */
    document.getElementsByClassName('language')[0].textContent = document.getElementsByClassName('language')[1].textContent = lang;


}
