jQuery(function($) {
	"use strict";
	// Author Code Here

	var owlPricing;
	var ratio = 2;

	// Window Load
	$(window).load(function() {
		// Preloader
		$('.intro-tables, .parallax, header').css('opacity', '0');
		$('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$('.preloader').hide();
			$('.parallax, header').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
			});
		});

		// Header Init
		if ($(window).height() > $(window).width()) {
			var ratio = $('.parallax').width() / $('.parallax').height();
			$('.parallax img').css('height', ($(window).height()) + 'px');
			$('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
		}

		$('header').height($(window).height() + 80);
		$('section .cut').each(function() {
			if ($(this).hasClass('cut-top'))
				$(this).css('border-right-width', $(this).parent().width() + "px");
			else if ($(this).hasClass('cut-bottom'))
				$(this).css('border-left-width', $(this).parent().width() + "px");
		});

		// Sliders Init
		$('.owl-schedule').owlCarousel({
			singleItem: true,
			pagination: true
		});
		$('.owl-testimonials').owlCarousel({
			singleItem: true,
			pagination: true
		});
		$('.owl-twitter').owlCarousel({
			singleItem: true,
			pagination: true
		});

		// Navbar Init
		$('nav').addClass('original').clone().insertAfter('nav').addClass('navbar-fixed-top').css('position', 'fixed').css('top', '0').css('margin-top', '0').removeClass('original');
		$('.mobile-nav ul').html($('nav .navbar-nav').html());
		$('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));

		// Typing Intro Init
		$(".typed").typewriter({
			speed: 60
		});

		// Popup Form Init
		var i = 0;
		var interval = 0.15;
		$('.popup-form .dropdown-menu li').each(function() {
			$(this).css('animation-delay', i + "s");
			i += interval;
		});
		$('.popup-form .dropdown-menu li a').click(function(event) {
			event.preventDefault();
			$(this).parent().parent().prev('button').html($(this).html());
		});

		// Onepage Nav
		$('.navbar.navbar-fixed-top .navbar-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpeed: 400,
			filter: ':not(.btn)'
		});
	});
	// Window Scroll
	function onScroll() {
		if ($(window).scrollTop() > 50) {
			$('nav.original').css('opacity', '0');
			$('nav.navbar-fixed-top').css('opacity', '1');
		} else {
			$('nav.original').css('opacity', '1');
			$('nav.navbar-fixed-top').css('opacity', '0');
		}
	}

	window.addEventListener('scroll', onScroll, false);

	// Window Resize
	$(window).resize(function() {
		$('header').height($(window).height());
	});

	// Pricing Box Click Event
	$('.pricing .box-main').click(function() {
		$('.pricing .box-main').removeClass('active');
		$('.pricing .box-second').removeClass('active');
		$(this).addClass('active');
		$(this).next($('.box-second')).addClass('active');
		$('#pricing').css("background-image", "url(" + $(this).data('img') + ")");
		$('#pricing').css("background-size", "cover");
	});

	// Mobile Nav
	$('body').on('click', 'nav .navbar-toggle', function() {
		event.stopPropagation();
		$('.mobile-nav').addClass('active');
	});

	$('body').on('click', '.mobile-nav a', function(event) {
		$('.mobile-nav').removeClass('active');
		if(!this.hash) return;
		event.preventDefault();
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$('body').on('click', '.mobile-nav a.close-link', function(event) {
		$('.mobile-nav').removeClass('active');
		event.preventDefault();
	});

	$('body').on('click', 'nav.original .navbar-nav a:not([data-toggle])', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	/*$('.styled-checkbox').on('click', function(event) {
		event.preventDefault();
		$('#agreed').toggleClass("is-checked");
	});*/

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin
		// if it's longer than the screen height, and keep the margin equal to
		// the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$('.popup-form').validate({
		focusCleanup: true,
		ignore: [],
		rules:{
			agree: {
				required: true
			},
			departDay:"required",
			returnDay:"required",
			rent: {
				required: true,
				number: true
			},
			name: "required",
			surname: "required",
			mail: {
      			required: true,
      			email: true,
    		},
			phone: {
				required: true,
				digits: true,
				minlength: 10,
				maxlength: 10
			},
			road: "required",
			city: "required",
			zipcode: {
				required: true,
				digits: true
			}
		},
		messages: {},
		success:"valid",
		validClass:"valid",
		errorClass:"invalid",
		highlight: function(element, errorClass, validClass) {
			if($(element).attr("name") === "agree") {
				console.log("highlight checkbox");
				$(element).closest(".checkbox").find(".styled-checkbox").addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
  		},
  		unhighlight: function(element, errorClass, validClass) {
			if($(element).attr("name") === "agree") {
				console.log("unhighlight checkbox");
				$(element).closest(".checkbox").find(".styled-checkbox").removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}

		},
		errorPlacement: function (error, element) {
    		return false;
		},
		submitHandler: function (form) {
			formMultidataAjaxSubmit();
			return false;
		}
	});

	var formMultidataAjaxSubmit =  function () {
		//form data to json object for post
		var postData = new FormData();
			postData.append('departDay', $('input[name=departDay]').val());
			postData.append('returnDay', $('input[name=returnDay]').val());
			postData.append('rent', $('input[name=rent]').val());
            postData.append( 'name',  $('input[name=name]').val());
            postData.append( 'surname',  $('input[name=surname]').val());
			postData.append( 'mail',  $('input[name=mail]').val());
			postData.append('phone', $('input[name=phone]').val());
			postData.append('road', $('input[name=road]').val());
			postData.append('city', $('input[name=city]').val());
			postData.append('zipcode', $('input[name=zipcode]').val());

			var fileSelect = document.getElementById('files');
			var rawFiles = fileSelect.files;
			for(var i= 0; i< rawFiles.length; i++) {
				var file = rawFiles[i];
				postData.append('photos',file);
			}

		//AJAX post request
		console.log("submitting...");
		$.ajax({
			type: 'POST',
		    url: 'http://localhost:8080/form',
			data: postData,
			dataType:'json',
			processData: false,
            contentType: false,
		    success: function(response){
				console.log('got a response from the server');
				console.log(response);

	    	},
			error: function (data) {
				console.log("error: ");
				console.log(data);
			},
			complete: function(data,status) {
				console.log("server called:" + status);
			}
        });
	};

	var dateInputToISOString = function (string) {
			var arr = string.split("-"),
				dDay =  new Date(parseInt(arr[0]),parseInt(arr[1])-1,parseInt(arr[2]));
			return dDay.toISOString();
	};

	$('.modal').on('show.bs.modal', centerModal);

	$('.modal-popup .close-link').click(function(event){
		event.preventDefault();
		$('#modal1').modal('hide');
	});

	$(window).on("resize", function() {
		$('.modal:visible').each(centerModal);
	});


});
