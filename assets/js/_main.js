/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */

(function($) {

var $menu = $('.navbar');
var menuOffsetY = $menu.offset().top;


// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var Roots = {
  // All pages
  common: {
    init: function() {
      // JavaScript to be fired on all pages
    }
  },
  // Home page
  home: {
    init: function() {
      // JavaScript to be fired on the home page

      //This a page anchor link?
      if (window.location.hash) {
        //Then, slow your roll son, load then scroll
        setTimeout(function() {
          $('html, body').scrollTop(0).show();
          $('html, body').animate({
            //how about a touch of offset, cause I'm rockin' a fixed nav
            scrollTop: $(window.location.hash).offset().top-59
          }, 1500, 'easeInOutExpo');
          console.log($(window.location.hash).offset().top-59);
        }, 2);
      }

      $(window).resize(function(){
      if ($menu.hasClass('navbar-static')){
          menuOffsetY = $menu.offset().top;
        }
      });

      $(window).ready(function(){
          // if ($(window).width() <= 768) {
          //   $menu.addClass('navbar-fixed-top').removeClass('navbar-static');
          //   console.log("less");
          // }
      });

      function scroll() {
          if ($(window).width() >= 768 && $(window).scrollTop() >= menuOffsetY) {
            $menu.removeClass('navbar-static').addClass('navbar-fixed-top');
          }
          else {
            $menu.removeClass('navbar-fixed-top').addClass('navbar-static');
          }
      }
      document.onscroll = scroll;

      $('#home .btn, .navbar a').bind('click', function(event) {
          var $anchor = $(this);
          console.log($(this));
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-59
          }, 1500, 'easeInOutExpo');
          event.preventDefault();
      });

      $('.navbar-collapse ul li a').click(function() {
          $('.navbar-toggle:visible').click();
      });

      $('.carousel-inner .fill').load(function(){
        $('.carousel').fadeIn();
      });
      $('.carousel').carousel({
        interval: 5000,
        pause: "false"
      });
    }
  },

  blog: {
    init: function() {
      // JavaScript to be fired on the blog

      $('.navbar-nav a').each(function(){
        var href = $(this).attr('href');
        $(this).attr('href','../'+href);
      });
      $('.navbar-nav .active a').attr('href','.');
      $('.navbar-brand').attr('href','../');
    }
  }
};

Roots.single = {
    init: Roots.blog.init
};

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
  fire: function(func, funcname, args) {
    var namespace = Roots;
    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
      namespace[func][funcname](args);
    }
  },
  loadEvents: function() {
    UTIL.fire('common');

    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
      UTIL.fire(classnm);
    });
  }
};


$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.


