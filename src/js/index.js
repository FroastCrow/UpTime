import "../scss/main.scss";
import Swiper from "swiper";

$(function () {
  //Swiper-slider START
  new Swiper("#swiper-slider", {
    loop: true,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 8,
    watchOverflow: true,
    autoHeight: false,
    navigation: {
      nextEl: "#swiper-button-next",
      prevEl: "#swiper-button-prev",
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      760: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
  });
  //Swiper-slider END

  // Modal window START
  const $body = $("#body");
  const $modal = $("#modal");

  $("#contact-us").click((event) => {
    event.preventDefault();
    $body.addClass("modal-open");
    $(".modal").css("display", "flex").hide().fadeIn(300);
  });

  $(".close-icon").click((event) => {
    event.preventDefault();
    $(".modal").fadeOut(300, function () {
      $body.removeClass("modal-open");
    });
  });

  $modal.click((event) => {
    if ($(event.target).is($modal)) {
      $modal.fadeOut(300, function () {
        $body.removeClass("modal-open");
      });
    }
  });
  // Modal window END

  // Burger menu START
  $("#burger-btn, #burger-close").click((event) => {
    event.preventDefault();
    $(".header").toggleClass("burger-menu-active");
    $body.toggleClass("modal-open");
    $signUpBtn.removeClass("bg-green").addClass("bg-white");
    $signInBtn.removeClass("bg-scrolled").addClass("bg-trans");
    const scroll = $(window).scrollTop();
    const isScrolled = scroll > 10;

    if ($header.hasClass("burger-menu-active") && isScrolled) {
      $header.removeClass("header-scrolled");
    } else {
      $linksList.show();
      $headerButtons.show();
      if (isScrolled) {
        $header.addClass("header-scrolled");
      }
    }
  });
  // Burger menu END

  //Language Dropdown START
  const $container = $("#language-dropdown-container");
  const $optionsList = $("#language-options-list");
  const $selectedText = $("#selected-language-text");
  const $linksList = $("#linksList");
  const $headerButtons = $("#headerButtons");

  $container.on("click", function (event) {
    event.stopPropagation();
    if (!$header.hasClass("burger-menu-active")) {
      $optionsList.slideToggle(200);
    }
    $container.toggleClass("open");
    if($header.hasClass("burger-menu-active")) {
      $linksList.toggle();
      $headerButtons.toggle();
      $optionsList.animate({width:'toggle'}, 222)
    } 
    
  });

  $optionsList.on("click", ".custom-select-option", function () {
    const selectedLangName = $(this).text();
    $selectedText.text(selectedLangName);
    $(this).addClass("selected").siblings().removeClass("selected");
  });

  $(document).on("click", function () {
    if ($container.hasClass("open")) {
      $optionsList.slideUp(200);
      $container.removeClass("open");
    }
  });
  //Language Dropdown END

  //header scrolled START
  const $header = $("#header");
  const $signUpBtn = $("#signUpBtn");
  const $signInBtn = $("#signInBtn");

  $(window).scroll(() => {
    const scroll = $(window).scrollTop();
    const isScrolled = scroll > 10;
    const isMenuOpen = $header.hasClass("burger-menu-active");
    $header.toggleClass("header-scrolled", isScrolled);

    if (isScrolled && !isMenuOpen) {
      $signUpBtn.removeClass("bg-white").addClass("bg-green");
      $signInBtn.removeClass("bg-trans").addClass("bg-scrolled");
    } else {
      $signUpBtn.removeClass("bg-green").addClass("bg-white");
      $signInBtn.removeClass("bg-scrolled").addClass("bg-trans");
    } 
  });

  //header scrolled END
});