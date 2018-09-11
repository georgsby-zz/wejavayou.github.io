"use strict";
$(function() {
  let navbar = $(".navbar-default");

  $('.navbar-default__link').on('click', function(){
    $('.navbar-default__link').removeClass('navbar-default__link--active')
    $(this).addClass('navbar-default__link--active')
  })

  $('.navbar-default__logo').on('click', function(){
    $('.navbar-default__link').removeClass('navbar-default__link--active')
  })


  $(window).scroll(function() {
    if ($(window).scrollTop() < 5) {
      navbar.removeClass("navbar-default--with-background");
    } else {
      navbar.addClass("navbar-default--with-background");
    }
  });

  $(".banner__carousel, .our-work__carousel").owlCarousel({
    items: 1,
    nav: true
  });

  $(".areas-we-work-in__cards").owlCarousel({
    nav: true
  });

  $(".certifications__caurosel").owlCarousel({
    nav: true,
    dots: false,
    items: 4
  });

  $(".our-videos__cards").owlCarousel({
    nav: true,
    dots: false
  });

  $(".testimonials__cards").owlCarousel({
    nav: true,
    items: 1,
    animateOut: 'fadeOut'
  });

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});
});
