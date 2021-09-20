/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : NEXGEN
* Version  : 1.0
* Author   : Codings
* Support  : codings.dev
*
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation
4. Slides
5. Particles
6. Progress Bar
7. Shuffle
8. Sign and Register Form
9. Simple Form
10. Recaptcha
11. Cookie Notice

----------------------------------------------*/

/*----------------------------------------------
1. Preloader
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    let preloader = $('.preloader');

    setTimeout(function() {
        preloader.addClass('ready');

    }, preloader.data('timeout'))
})

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {
        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })


    $('.menu .nav-item.dropdown').each(function() {
        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (e) {

        if($(this).hasClass('prevent')) {
            e.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
})

/*----------------------------------------------
3. Navigation
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var navbar   = $('.navbar.sub');
    var toTop    = $('#scroll-to-top');

    $(document).ready(function() {
        if (position > 0) {
            navbar.addClass('navbar-sticky');
        }
        toTop.hide();
    })

    $(window).scroll(function () {

        navbar.removeAttr('data-aos');
        navbar.removeAttr('data-aos-delay');

        var scroll = $(window).scrollTop();

        if (!navbar.hasClass('relative')) {

            // Down
            if (scroll > position) {

                navbar.addClass('navbar-sticky');

                if(navbar.hasClass('navbar-fixed') || window.innerWidth <= 767) {
                    navbar.removeClass('hidden').addClass('visible');

                } else {

                    if ($(window).scrollTop() >= window.innerHeight) {
                        navbar.removeClass('visible').addClass('hidden');
                    }
                }

                toTop.fadeOut('fast');

            // Up
            } else {

                navbar.removeClass('hidden').addClass('visible');

                // Top
                if ($(window).scrollTop() <= 15) {
                    navbar.removeClass('navbar-sticky');

                } else {

                    if(!navbar.hasClass('navbar-no-fixed')) {
                        navbar.addClass('visible');
                    }
                }

                if (position >= window.innerHeight && window.innerWidth >= 767) {
                    toTop.fadeIn('fast');

                } else {
                    toTop.fadeOut('fast');
                }
            }
            position = scroll;
        }
    })

    $('.nav-link').each(function() {
        let href = $(this).attr('href');
        if (href.length > 1 && href.indexOf('#') != -1) {
            $(this).addClass('smooth-anchor');
        }
    })

    $('.nav-link').each(function() {

        if(this.hasAttribute('href')) {
            let href = $(this).attr('href');
            if (href.length > 1 && href.indexOf('#') != -1) {
                $(this).addClass('smooth-anchor');
            }
        }

        let body = $('body');

        if(this.hasAttribute('href') && ! body.hasClass('home')) {
            let href = $(this).attr('href');
            if (href.length > 1 && href.indexOf('#') != -1) {
                $(this).removeClass('smooth-anchor');
                $(this).attr('href', '/'+href);
            }
        }
    })

    $(document).on('click', '.smooth-anchor', function (e) {
        e.preventDefault();

        let href   = $(this).attr('href');
        let target = $.attr(this, 'href');

        if($(target).length > 0) {

            if (href.length > 1 && href.indexOf('#') != -1) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 500);
            }
        }
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {
            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {
            dropdown.parent().find('.nav-link').first().removeClass('active');
        })
    })

    let navbar_holder = $('.navbar-holder');
    let navbar_height = $('.navbar-expand.sub').outerHeight();

    if(navbar_holder.length > 0) {
        $('.navbar-holder').css('min-height', navbar_height);
    }
})

/*----------------------------------------------
4. Slides
----------------------------------------------*/

jQuery(function ($) {

    setTimeout(function() {
        $('.no-slider .left').addClass('init');
        $('.no-slider .right').addClass('init');
    }, 1200)

    var animation = function(slider) {

        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .buttons');
        let nav = $(slider + ' nav');

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');

        setTimeout(function() {
            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');

            AOS.refresh();

        }, 100)

        if ($('.full-slider').hasClass('animation')) {

            $('.full-slider .left').addClass('off');
            $('.full-slider .left').removeClass('init');
            $('.full-slider .right').addClass('off');
            $('.full-slider .right').removeClass('init');

            setTimeout(function() {
                $('.full-slider .left').removeClass('off');
                $('.full-slider .right').removeClass('off');
            }, 200)

            setTimeout(function() {
                $('.full-slider .left').addClass('init');
                $('.full-slider .right').addClass('init');
            }, 1000)

        } else {
            $('.full-slider .left').addClass('init');
            $('.full-slider .right').addClass('init');
        }
    }

    var fullSlider = new Swiper('.full-slider', {

        autoplay: {
            delay: 10000,
        },
        parallax: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: {
            el: '.full-slider .swiper-pagination',
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            init: function() {
                animation('.full-slider');
                let pagination = $('.full-slider .swiper-pagination');
                pagination.hide();

                setTimeout(function() {
                    pagination.fadeIn('slow');
                }, 3600)
            },
            slideChange: function() {
                animation('.full-slider');

                let title = $('.full-slider .title');
                let description = $('.full-slider .description');
                let btn = $('.full-slider .buttons');

                title.attr('data-aos-delay', 400);
                description.attr('data-aos-delay', 800);
                btn.attr('data-aos-delay', 1200);
            }
        }
    })

    $('.mid-slider').each(function() {

        if($(this).data('perview')) {
            var midPerView = $(this).data('perview');
        } else {
            var midPerView = 3;
        }

        var midSlider = new Swiper(this, {

            autoplay: false,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1023: {
                    slidesPerView: midPerView,
                    spaceBetween: 30
                }
            }
        })
    })

    $('.min-slider').each(function() {

        if($(this).data('perview')) {
            var minPerView = $(this).data('perview');
        } else {
            var minPerView = 6;
        }

        var minSlider = new Swiper(this, {

            autoplay: {
                delay: 5000,
            },
            loop: false,
            centerInsufficientSlides: true,
            slidesPerView: 2,
            spaceBetween: 15,
            breakpoints: {
                424: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1023: {
                    slidesPerView: 4,
                    spaceBetween: 15
                },
                1199: {
                    slidesPerView: minPerView,
                    spaceBetween: 15
                }
            },
            pagination: false
        })
    })

    var noSlider = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: function() {
                animation('.no-slider')
            }
        }
    })
})

/*----------------------------------------------
6. Progress Bar
----------------------------------------------*/

jQuery(function($) {

    'use strict';

    function initCounter(section, item, duration) {

        $(document).one('inview', item, function(event, inview) {

            if (inview) {

                $(item).each(function() {

                    var percent = $(this).data('percent');
                    var pcolor  = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
                    var scolor  = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');

                    if ( $(section).hasClass('odd')) {
                        var tmode = 'rgba(255, 255, 255, 0.075)';
                    } else {
                        var tmode = 'rgba(0, 0, 0, 0.075)';
                    }

                    if ( $(section).hasClass('preloader') || $(section).hasClass('skills')) {
                        var symbol = '<i>%</i>';
                    } else {
                        var symbol = '';
                    }

                    if(section == '.counter.preloader' || section == '.counter.funfacts') {
                        var height = 70;
                    } else {
                        var height = 110;
                    }

                    $(this).radialProgress({
                        value: (percent / 100),
                        size: height,
                        thickness: 10,
                        lineCap: 'butt',
                        emptyFill: tmode,
                        animation: {
                            duration: duration,
                            easing: "radialProgressEasing"
                        },
                        fill: {
                            gradient: [[pcolor, 0.1], [scolor, 1]],
                            gradientAngle: Math.PI / 4
                        }
                    }).on('radial-animation-progress', function(event, progress) {
                        $(this).find('span').html(Math.round(percent * progress) + symbol);
                    })
                })
            }
        })
    }

    let preloader = $('.preloader');
    let preloader_timeout = ( preloader.data('timeout') - 800);

    initCounter('.counter.preloader', '.counter.preloader .radial', preloader_timeout);
    initCounter('.counter.funfacts', '.counter.funfacts .radial', 5000);
    initCounter('.counter.skills', '.counter.skills .radial', 5000);
})
