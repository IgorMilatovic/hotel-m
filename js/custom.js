$(function(){

   'use strict';

   var isMobile = {
      Android: function() {
         return navigator.userAgent.match(/Android/i);
      },
         BlackBerry: function() {
         return navigator.userAgent.match(/BlackBerry/i);
      },
         iOS: function() {
         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
         Opera: function() {
         return navigator.userAgent.match(/Opera Mini/i);
      },
         Windows: function() {
         return navigator.userAgent.match(/IEMobile/i);
      },
         any: function() {
         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
   };

	// Main Menu Superfish
   var mainMenu = function() {

      $('#fh5co-primary-menu').superfish({
         delay: 0,
         animation: {
            opacity: 'show'
         },
         speed: 'fast',
         cssArrows: true,
         disableHI: true
      });

   };

   // Offcanvas and cloning of the main menu
   var offcanvas = function() {

      var $clone = $('#fh5co-menu-wrap').clone();
      $clone.attr({
         'id' : 'offcanvas-menu'
      });
      $clone.find('> ul').attr({
         'class' : '',
         'id' : ''
      });

      $('#fh5co-page').prepend($clone);

      // click the burger
      $('.js-fh5co-nav-toggle').on('click', function(){

         if ( $('body').hasClass('fh5co-offcanvas') ) {
            $('body').removeClass('fh5co-offcanvas');
            $(this).removeClass('active');
         } else {
            $('body').addClass('fh5co-offcanvas');
            $(this).addClass('active');
         }
         // $('body').toggleClass('fh5co-offcanvas');

      });

      $('#offcanvas-menu').css('height', $(window).height());

      $(window).resize(function(){
         var w = $(window);


         $('#offcanvas-menu').css('height', w.height());

         if ( w.width() > 769 ) {
            if ( $('body').hasClass('fh5co-offcanvas') ) {
               $('body').removeClass('fh5co-offcanvas');
            }
         }

      });   

   }
   

   // Click outside of the Mobile Menu
   var mobileMenuOutsideClick = function() {
      $(document).click(function (e) {
       var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
       if (!container.is(e.target) && container.has(e.target).length === 0) {
         if ( $('body').hasClass('fh5co-offcanvas') ) {
            $('body').removeClass('fh5co-offcanvas');
         }
       }
      });
   };

   var counter = function() {
      $('.js-counter').countTo({
         formatter: function (value, options) {
         return value.toFixed(options.decimals);
       },
      });
   };

   var contentWayPoint = function() {
      var i = 0;
      $('.animate-box').waypoint( function( direction ) {

         if( direction === 'down' && !$(this.element).hasClass('animated') ) {
            
            i++;

            $(this.element).addClass('item-animate');
            setTimeout(function(){

               $('body .animate-box.item-animate').each(function(k){
                  var el = $(this);
                  setTimeout( function () {
                     el.addClass('fadeInUp animated');
                     el.removeClass('item-animate');
                  },  k * 200, 'easeInOutExpo' );
               });
               
            }, 100);
            
         }

      } , { offset: '85%' } );
   };


   var fullHeight = function() {

      if ( !isMobile.any() ) {
         $('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
         $(window).resize(function(){
            $('.js-fullheight').css('height', $(window).height() - $('#fh5co-header').height());
         });
      }

   };


   //Date Picker

   $('#date-start, #date-end').datepicker();

   [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
      new SelectFx(el);
   } );


   
   // Tabs

   var tabs = function() {
      $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);

      $(window).resize(function(){
         $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);
      });

      $('.tabs-nav > a').on('click', function(e){
         
         var tab = $(this).data('tab');

         $('.tabs-nav > a').removeClass('active');
         $(this).addClass('active');

         $('.tab-content').removeClass('active show');
         
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('active');
            $('#hotel-facilities').css('height', $('.tab-content.active').height() + 600);
         }, 200);
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('show');
         }, 400);
         

         e.preventDefault();
      });
   };

   var sliderMain = function() {
      
      $('#fh5co-hero .flexslider').flexslider({
         animation: "fade",
         slideshowSpeed: 5000,
         directionNav: true,
         start: function(){
            setTimeout(function(){
               $('.slider-text').removeClass('animated fadeInUp');
               $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
         },
         before: function(){
            setTimeout(function(){
               $('.slider-text').removeClass('animated fadeInUp');
               $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
         }

      });

      $('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());  
      $(window).resize(function(){
         $('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());  
      });

   };

   // Parallax
   var parallax = function() {
      $(window).stellar();
   };


   $(function(){
      sliderMain();
      tabs();
      mainMenu();
      offcanvas();
      contentWayPoint();
      mobileMenuOutsideClick();
      parallax();
      fullHeight();
      counter();
   });

});

// otvaranje i zatvaranje booking prozora

const checkAvailability = document.querySelector('.a-col');
const proba = document.querySelector('.proba');
const xDugme = document.querySelector('.close-widget-holder');

function pozoviBooking () {
   if (xDugme.childNodes[0] === undefined) {
   //iframe booking
   let booking = document.createElement("iframe");
   booking.setAttribute('src', ' https://hotel.montenegro-booking.com/HotelMClub.html');
   booking.setAttribute('class', 'booking-widget'); 
   booking.setAttribute('width', '100%'); 
   
   //close dugme
   let divZatvori = document.createElement("div");
   divZatvori.setAttribute('class', 'close-widget');
   let zatvori = document.createElement("span");
   let text = 'X';
   let zatvoriText = document.createTextNode(text);
   zatvori.appendChild(zatvoriText);
   divZatvori.appendChild(zatvori)
   xDugme.appendChild(divZatvori);
   
   //dodavanje iframe-a i close-a na stranu
   proba.appendChild(xDugme);
   proba.appendChild(booking);
   console.log(xDugme.childNodes[0])
   //zatvaranje
   function zatvoriBooking() {
      while (proba.hasChildNodes()) {  
         proba.removeChild(proba.firstChild);
      } 
      while (xDugme.hasChildNodes()) {  
         xDugme.removeChild(xDugme.firstChild);
      }
   };
   
   //dodavanje funkcije zatvaranja na close dugme
   xDugme.addEventListener('click', zatvoriBooking);

}//if

} 
//kraj fa


checkAvailability.addEventListener('click', pozoviBooking);

