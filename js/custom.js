// control active status of navigation and scroll
$('.js-header-nav .nav__link').click(function(e) {
  $(this).addClass('nav__link--active');
  $(this).parent().siblings().children().removeClass('nav__link--active');
  var hash = this.hash;
  var headerHeight = $('.js-header').height();
  if ($(hash).length) {
    $('html, body').animate({
      scrollTop: $(hash).offset().top - headerHeight,
    }, 500);
  }
});

// control placeholder input
$('.js-input').on('focus', function() {
  $(this).addClass('form-contact__input--focus');
});

$('.js-input').on('blur', function() {
  if ($(this).val() == '') {
    $(this).removeClass('form-contact__input--focus');
  }
});

// skill bar on scroll control
window.addEventListener('scroll', runSkillBar);

// carousel advertisement
$('.js-carousel-ads').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  fade: true,
  cssEase: 'linear',
  speed: 600,
  autoplaySpeed: 6000,
  nextArrow: $('.js-btn-next'),
  prevArrow: $('.js-btn-prev'),
});

// caraousel client review
$('.js-carousel-review').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  fade: true,
  speed: 600,
  autoplaySpeed: 8000,
  dots: true,
  appendDots: $('.js-review-control'),
  dotsClass: 'dot-control',
  customPaging: function(slider, i) {
    return '<span class="dot-control__item" role="button"></span>';
  },
});

// carousel post thumbnail
$('.js-carousel-thumbnail').each(function() {
  var id = $(this).parent().attr('id');
  $('#' + id + ' .js-carousel-thumbnail').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    fade: true,
    speed: 500,
    autoplaySpeed: 4000,
    nextArrow: $('#' + id + ' .js-post-next'),
    prevArrow: $('#' + id + ' .js-post-prev'),
    dots: true,
    appendDots: $('#' + id + ' .js-dot-control'),
    dotsClass: 'dot-control',
    customPaging: function(slider, i) {
      return '<span class="dot-control__item" role="button"></span>';
    },
  });
});

// clip text overflow
$().vEllipsis({
  'element': '.js-post-detail',
  'lines': 3,
  'char': '[...]',
});

// responsive navigation hide/show
$('.js-button-collapse').click(function() {
  $('.js-header-nav').slideToggle(function() {
    if ($(this).css('display') == 'none') {
      $(this).removeAttr('style');
    }
  });
});

$('body').click(function(e) {
  if ($(window).width() < 768) {
    var header = document.querySelector('.js-header');
    var target = e.target.closest('.js-header');
    if (target !== header) {
      $('.js-header-nav').slideUp(function() {
        $(this).removeAttr('style');
      });
    }
  }
});

// Internet Explorer add class to navigation

$(function() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  var trident = ua.indexOf('Trident/');
  if (msie > 0 || trident > 0) {
    $('.js-header-nav').addClass('ie');
  }
});
