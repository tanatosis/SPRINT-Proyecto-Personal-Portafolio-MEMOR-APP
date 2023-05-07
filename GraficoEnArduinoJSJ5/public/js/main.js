(function($) {
    "use strict";

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // iniciar wow
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });


    // desplazamiento barra nav
    $(".navbar-nav a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // boton para subir al inicio
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // contador
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Screenshot carrusel
    $(".screenshot-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        dots: true,
        items: 1
    });


    // carrusel testimonios aun no activado
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);


//function sendMail() {
//var params = {
// titulo: document.getElementById("tituloDespacho"),
//direccion: document.getElementById("direccion").value,
//comuna: document.getElementById("comuna").value,
//region: document.getElementById("region").value,
//email: document.getElementById("email").value,


//};

//const serviceID = "";
//const templateID = "";

//emailjs.send(serviceID, templateID, params)
//  .then(res => {
//    document.getElementById("direccion").value = "";
//  document.getElementById("comuna").value = "",
//    document.getElementById("region").value = "",
//  document.getElementById("destinatario").value = "";

// console.log(res);
//  alert("Mensaje enviado exitosamente!!")

//})
//.catch(err => console.log(err));

//}