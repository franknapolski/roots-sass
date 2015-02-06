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

      $('#home .intro, #carousel').hide();
      // JavaScript to be fired on the home page

      //Does URL contain hash
      if (window.location.hash) {
        //Pause
        setTimeout(function() {
          $('html, body').scrollTop(0).show();
          $('html, body').animate({
            //Scroll to hash
            scrollTop: $(window.location.hash).offset().top-59
          }, 1500, 'easeInOutExpo');
          console.log($(window.location.hash).offset().top-59);
        }, 2);
      }

      var small = false; //Is window mobile / desktop
      var homeHeight = $('#home').outerHeight()-60; //Get #home section height

      //Function to check if window is less than 768px wide
      function isWindowSmall(winWidth) {
        if (winWidth <= 767) {
          $('.navbar').addClass('navbar-fixed-top').removeClass('navbar-static');
          return true;
        }
        else if (winWidth >= 768 && $(window).scrollTop() < homeHeight ) {
          $('.navbar').removeClass('navbar-fixed-top').addClass('navbar-static');
          return false;
        }
        else {
          return false;
        }
      }
      $(window).ready(function(){
        small = isWindowSmall($(window).width()); //Init
        console.log(small);
        if ( $(this).scrollTop() >= homeHeight ) {
          $('.navbar').addClass('navbar-fixed-top').removeClass('navbar-static');
        }
        $('#home .intro, #carousel').fadeIn(2000);

      });

      //On resize, check isWindowSmall
      $(window).resize(function(){
        small = isWindowSmall($(this).width());
        homeHeight = $('#home').outerHeight()-50;
      });

      //Affix navbar, or don't if window is small
      $('.navbar').affix({
          offset: {
              top: homeHeight
          }
      })
      .on('affix.bs.affix', function(){
          if (!small) {
            $(this).addClass('navbar-fixed-top').removeClass('navbar-static');
          }
      })
      .on('affix-top.bs.affix', function() {
          if (!small) {
            $(this).removeClass('navbar-fixed-top').addClass('navbar-static');
          }
      });


      // function scroll() {
      //     if ($(window).scrollTop() <= menuOffsetY) {
      //       $menu.removeClass('navbar-fixed-top').addClass('navbar-static');
      //     }
      //     else {
      //       $menu.removeClass('navbar-static').addClass('navbar-fixed-top');
      //     }
      // }
      // document.onscroll = scroll;

      $('#home .btn, .navbar a').bind('click', function(event) {
          var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-59
          }, 1500, 'easeInOutExpo');
          event.preventDefault();
      });

      $('.navbar-collapse ul li a, .navbar-brand').click(function() {
          if ( $('.navbar-collapse').hasClass('in') ){
            $('.navbar-toggle:visible').click();
          }
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
      var root = window.location.origin;
      console.log(root);
      $('.navbar-nav a').each(function(){
        var href = $(this).attr('href');
        if ($(this).parent().hasClass('active')) {
          $(this).attr('href',href);
        }
        else {
          $(this).attr('href',root+href);
        }

      });
      // $('.navbar-nav .active a').attr('href','.');
      // $('.navbar-nav .active')
      $('.navbar-brand').attr('href','../');
    }
  }
};

Roots.single = {
    init: Roots.blog.init
};

Roots.archive = {
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


