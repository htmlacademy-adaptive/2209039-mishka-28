let navMain = document.querySelector('.main-navigation');
let navToggle = document.querySelector('.main-header__toggle');
let headerHero = document.querySelector('.main-header--index');
let headerTitle = document.querySelector('.main-header__headline');
let bgContainer = document.querySelector('.main-header__background-container');

headerHero?.classList.remove('main-header--index-nojs');
navMain.classList.remove('main-navigation--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-navigation--closed')) {
    navMain.classList.remove('main-navigation--closed');
    navMain.classList.add('main-navigation--opened');
    headerTitle.classList.add('main-header__headline--opened');
    bgContainer.classList.add('main-header__background-container--opened');
  } else {
    navMain.classList.add('main-navigation--closed');
    navMain.classList.remove('main-navigation--opened');
    headerTitle.classList.remove('main-header__headline--opened');
    bgContainer.classList.remove('main-header__background-container--opened');

  }
});

navToggle.addEventListener('click', function () {
  if (navToggle.classList.contains('main-header__toggle--closed')) {
    navToggle.classList.remove('main-header__toggle--closed');
    navToggle.classList.add('main-header__toggle--opened');
  } else {
    navToggle.classList.add('main-header__toggle--closed');
    navToggle.classList.remove('main-header__toggle--opened');
  }
});
