/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
(function ($) {
  var global_settings = {};

  var methods = {
    init: function (options) {
      // This is the easiest way to have default options.
      var settings = $.extend({
        // These are the defaults.
        color: '#000000',
        height: '300px',
        width: '300px',
        line_width: 1,
        starting_position: 0,
        padding: 1,
        percent: 100,
        counter_clockwise: false,
        percentage: true,
        text: '',
      }, options);
      global_settings = settings;


      // Create percentage
      // var percentage = $("<div class='progress-percentage'></div>");

      // if(!global_settings.percentage) {
      //     percentage.text(global_settings.percentage);
      // }
      // $(this).append(percentage);

      // Correct any invalid values
      if (global_settings.starting_position != 100) {
        global_settings.starting_position = global_settings.starting_position % 100;
      }
      if (global_settings.ending_position != 100) {
        global_settings.ending_position = global_settings.ending_position % 100;
      }
      // No 'px' or '%', add 'px'
      appendUnit(global_settings.width);
      appendUnit(global_settings.height);

      // Apply global_settings
      $(this).css({
        'height': global_settings.height,
        'width': global_settings.width,
      });
      $(this).addClass('circular-progress-bar');

      // Remove old canvas
      $(this).find('canvas').remove();

      // Put canvas inside this
      $(this).append(createCanvas($(this)));

      // Return allows for chaining
      return this;
    },
    percent: function (value) {
      // Change percent
      global_settings.percent = value;
      // Apply global_settings
      $(this).css({
        'height': global_settings.height,
        'width': global_settings.width
      });
      // Remove old canvas
      $(this).children('canvas').remove();
      // Put canvas inside this
      $(this).append(createCanvas($(this)));

      // Return allows for chaining
      return this;
    },
    animate: function (value, time) {
      // Apply global_settings
      $(this).css({
        'height': global_settings.height,
        'width': global_settings.width,
      });

      // Number of intervals, 10ms interval
      var num_of_steps = time / 1;
      // Amount of change each step
      var percent_change = (value - global_settings.percent) / num_of_steps;

      // Variable conflict, rename this
      var scope = $(this);
      var theInterval = setInterval(function () {
        if (global_settings.percent < value) {
          // Remove old canvas
          scope.children('canvas').remove();
          // Increment percent
          global_settings.percent += percent_change;
          // Put canvas inside this
          scope.append(createCanvas(scope));
        } else {
          clearInterval(theInterval);
        }
      }, 10);

      // Return allows for chaining
      return this;
    }
  };

  $.fn.circularProgress = function (methodOrOptions) {
    if (methods[methodOrOptions]) {
      // Method found
      return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      // Default to "init", object passed in or nothing passed in
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + methodOrOptions + ' does not exist.');
    }
  };

  /* =========================================================================
	    PRIVATE FUNCTIONS
	========================================================================= */

  // return string without 'px' or '%'
  function removeUnit(apples) {
    if (apples.indexOf('px')) {
      return apples.substring(0, apples.length - 2);
    } else if (canvas_height.indexOf('%')) {
      return apples.substring(0, apples.length - 1);
    }
  };
  // return string with 'px'
  function appendUnit(apples) {
    if (apples.toString().indexOf('px') < -1 && apples.toString().indexOf('%') < -1) {
      return apples += 'px';
    }
  };
  // calculate starting position on canvas
  function calcPos(apples, percent) {
    if (percent < 0) {
      // Calculate starting position
      var starting_degree = (parseInt(apples) / 100) * 360;
      var starting_radian = starting_degree * (Math.PI / 180);
      return starting_radian - (Math.PI / 2);
    } else {
      // Calculate ending position
      var ending_degree = ((parseInt(apples) + parseInt(percent)) / 100) * 360;
      var ending_radian = ending_degree * (Math.PI / 180);
      return ending_radian - (Math.PI / 2);
    }
  };
  // Put percentage or custom text inside progress circle
  function insertText(scope) {
    $('.progress-percentage').text(Math.floor(global_settings.percent) + '%');
  }
  // create canvas
  function createCanvas(scope) {
    // Remove 'px' or '%'
    var canvas_height = removeUnit(global_settings.height.toString());
    var canvas_width = removeUnit(global_settings.width.toString());

    // Create canvas
    var canvas = document.createElement('canvas');
    canvas.height = canvas_height;
    canvas.width = canvas_width;

    // Create drawable canvas and apply properties
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = global_settings.color;
    ctx.lineWidth = global_settings.line_width;

    // Draw arc
    ctx.beginPath();

    // Calculate starting and ending positions
    var starting_radian = calcPos(global_settings.starting_position, -1);
    var ending_radian = calcPos(global_settings.starting_position, global_settings.percent);
    // Calculate radius and x,y coordinates
    var radius = 0;
    var xcoord = canvas_width / 2;
    var ycoord = canvas_height / 2;
    // Height or width greater
    // if(canvas_height >= canvas_width) {
    //     radius = canvas_width / 2 - (global_settings.line_width);
    // } else {
    //     radius = canvas_height / 2 - (global_settings.line_width);
    // }

    if (canvas_height >= canvas_width) {
      radius = canvas_width / 2 - global_settings.line_width - global_settings.padding;
    } else {
      radius = canvas_height / 2 - global_settings.line_width - global_settings.padding;
    }

    /*
			x coordinate
			y coordinate
			radius of circle
			starting angle in radians
			ending angle in radians
			clockwise (false, default) or counter-clockwise (true)
		*/
    ctx.arc(xcoord, ycoord, radius, starting_radian, ending_radian, global_settings.counter_clockwise);
    ctx.stroke();

    // Add text
    if (global_settings.percentage) {
      insertText(scope);
    }

    return canvas;
  };
}(jQuery));

/*! jQuery vEllipsis - v0.3.1 - 2017-10-25
 * https://github.com/nulen/jquery.vEllipsis
 * Copyright (c) 2017 Nulen; Licensed MIT */
(function ($) {
	$.fn.vEllipsis = function (options) {

		if (!window.vEllipsis) {
			window.vEllipsis = {};

			// default option
			window.vEllipsis.options = {
				'element': '.v-ellipsis',           // element identifier
				'lines': 1,                         // show that many lines
				'onlyFullWords': false,             // set to true to avoid cutting the text in the middle of a word
				'char': '...',                      // ellipsis
				'callback': function () {},         // callback function
				'responsive': false,                // responsive to window resize
				'tolerance': 5,                     // optimal tolerance (best value is 5 based on tests)
				'delay': 300,                       // delay after resize
				'elementEvent': 'change',           // event to reEllipsise
				'additionalEnding': false,          // additional link after char (from data-link on element)
				'expandLink': false,                // expand link after char and additional link (from data-expandlink on element)
				'collapseLink': false,              // collapse link after char and additional link (from data-collapselink on element)
				'animationTime': '0',               // time for animations
				'linesClass': 'v-ellipsis-lines'    // class for changing number of lines
			};

			$(document).on('vEllipsisCreate', function () {
				runOnElements();
			});
		} else {
			window.vEllipsis.options = $.extend(window.vEllipsis.options, options);
			$(document).trigger('vEllipsisCreate');
			return;
		}

		var resizeTimer,
			scrollTimer,
			docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height(),
			options;

		window.vEllipsis.options = options = $.extend(window.vEllipsis.options, options);
		if (options.tolerance < 1) options.tolerance = 1;

		function isScrolledIntoView($elem) {
			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();

			return !(elemTop > docViewBottom || elemBottom < docViewTop);
		}

		function doEllipsis($elem, opts) {
			if (opts.expandLink && $elem.data('expanded') === true)
				return;

			if ($elem.is(':visible')) {
				var text;

				if ($elem.data('lastHeight')) {
					if ($elem.data('lastHeight') === $elem.height() && $elem.data('lastWidth') === $elem.width()
						&& ($elem.data('lastText') === $elem.text() || $elem.data('lastHTML') === $elem.html())) {
						return;
					}
				}

				if ($elem.data('originalText')) {
					text = $elem.data('originalText');
					$elem.text(text);
				} else {
					text = $elem.text();
					$elem.data('originalText', text);
					$elem.data('originalHTML', $elem.html());
				}

				var classList = $elem.attr('class').split(/\s+/);
				var matchResult;
				var lines = opts.lines;
				var regEx = new RegExp("^" + opts.linesClass + "-(\\d+)$");

				$.each(classList, function (index, item) {
					matchResult = item.match(regEx);
					if (matchResult !== null)
						lines = Number(matchResult[1]);
				});

				if (opts.additionalEnding && $elem.data('link')) {
					var link = $elem.data('link');
				}
				if (opts.expandLink && $elem.data('expandlink')) {
					var expandlink = $elem.data('expandlink');
				}

				if (lines < 1) {
					text = '';
					$elem.text('');
				} else {
					var origText = text;
					var origLength = origText.length;
					var origHeight = $elem.height();

					// get height
					$elem.text('a');
					var lineHeight = parseFloat($elem.css('lineHeight'), 10);
					var rowHeight = $elem.height();
					var gapHeight = lineHeight > rowHeight ? (lineHeight - rowHeight) : 0;
					var targetHeight = gapHeight * (lines - 1) + rowHeight * lines;

					if (origHeight <= targetHeight) {
						$elem.text(text);

						$elem.data('lastText', text)
						$elem.data('lastHeight', $elem.height());
						$elem.data('lastWidth', $elem.width());

						return;
					}

					// raw approximation of final length
					var approxTargetRatio = (targetHeight + rowHeight) / (origHeight - (rowHeight + gapHeight));
					if (approxTargetRatio > 1) approxTargetRatio = 1;
					var approxTargetLength = Math.ceil(approxTargetRatio * origLength);

					text = text.slice(0, approxTargetLength);

					var character = opts.char;
					if (link) {
						$elem.html(link);
						character += ' ' + $elem.text();
					}
					if (expandlink) {
						$elem.html(expandlink);
						character += ' ' + $elem.text();
					}
					var start = lines === 1 ? 0 : Math.ceil(approxTargetLength / 2), length = 0;
					var end = approxTargetLength - 1;

					while (start + opts.tolerance - 1 < end) { // binary search for max length
						length = Math.ceil((start + end) / 2);

						$elem.text(text.slice(0, length) + character);

						if ($elem.height() <= targetHeight) {
							start = length;
						} else {
							end = length - opts.tolerance;
						}
					}

					text = text.slice(0, start);

					if (opts.onlyFullWords) {
						text = text.replace(/\s([^\s.]+)$/, ''); // remove fragment of the last word together
					}

					text = text.replace(/([:.,\s]+$)/g, ''); // cutting any left spaces, commas or dots at the end of text

					text += opts.char;
				}

				if (opts.animationTime != 0 && $elem.data('collapsing')) {
					var targetOuterHeight = $elem.outerHeight();
					$elem.html($elem.data('originalHTML')).css('height', $elem.outerHeight()).animate({
						height: targetOuterHeight
					}, parseInt(opts.animationTime), function () {
						$elem.css('height', '');
						fillElement();
					});
				} else {
					fillElement();
				}

				function fillElement() {
					$elem.text(text);

					if (link) {
						$elem.append(' ', link);
					}

					if (expandlink) {
						var expandElement = $(document.createElement('a')).append(expandlink);
						expandElement.on('click', function () {
							expandSection($elem);
						});
						$elem.append(' ', expandElement);
					}
				}

				$elem.data('lastText', text);
				$elem.data('lastHTML', $elem.html());
				$elem.data('lastHeight', $elem.height());
				$elem.data('lastWidth', $elem.width());

				opts.callback.call($elem[0]);
			}
		}

		function expandSection($elem) {
			if (options.animationTime != 0) {
				var originalOuterHeight = $elem.outerHeight();
			}

			$elem.html($elem.data('originalHTML'));

			if (options.animationTime != 0) {
				var targetOuterHeight = $elem.outerHeight();

				$elem.css('height', originalOuterHeight).animate({
					height: targetOuterHeight
				}, parseInt(options.animationTime), function () {
					$elem.css('height', '');
				});
			}

			if (options.expandLink && $elem.data('collapselink')) {
				var collapselink = $elem.data('collapselink'),
					collapseElement = $(document.createElement('a')).append(collapselink);

				collapseElement.on('click', function () {
					collapseSection($elem);
				});
				$elem.append(' ', collapseElement);
				$elem.data('expanded', true);
			}
		}

		function collapseSection($elem) {
			$elem.removeData('expanded').data('collapsing', true);
			doEllipsis($elem, options);
			$elem.removeData('collapsing');
		}

		function runOnElements(preventSearch) {
			docViewTop = $(window).scrollTop();
			docViewBottom = docViewTop + $(window).height();

			$(options.element).each(function () {
				var $elem = $(this);

				if (isScrolledIntoView($elem))
					doEllipsis($elem, options);
			});

		}

		function onResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function () {
				runOnElements();
			}, options.delay);
		}

		if (options.responsive) {
			$(window).resize(function () {
				onResize();
			});
		}

		// Lazy ellipsis
		$(window).on('scroll', function () {
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function () {
				runOnElements();
			}, 100);
		});

		$(document).on(options.elementEvent, options.element, function () {
			var $elem = $(this);

			$elem.data('originalText', $elem.text());
			$elem.data('originalHTML', $elem.html());
			doEllipsis($elem, options);
		});

		runOnElements();

		return this;
	};
})(jQuery);

/**
 * Use on window scroll to show skill bar
 */
function runSkillBar() {
  var ourSkill = $('.js-our-skills');
  var topDistance = ourSkill.offset().top;
  var ourSkillHeight = ourSkill.height();
  var scrollTop = window.pageYOffset;
  if (scrollTop > topDistance - ourSkillHeight) {
    $('.js-skill-bar').each(function() {
      var skillPoint = $(this).attr('data-skill');
      $(this).circularProgress({
        line_width: 3,
        color: '#ffffff',
        width: '162px',
        height: '162px',
        starting_position: 0,
        padding: 4,
        percent: 0,
        percentage: true,
      }).circularProgress('animate', skillPoint, 300);
    });

    window.removeEventListener('scroll', runSkillBar);
  }
}

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
