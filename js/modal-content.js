'use strict';

(function() {
  var buttonShowHotels = document.querySelector('.show-hotels');
  var formSearchHotel = document.querySelector('.dates-and-people');

  var fieldArrival = formSearchHotel.querySelector('#arrival');
  var fieldAdults = formSearchHotel.querySelector('#adults');
  var fieldChildren = formSearchHotel.querySelector('#children');

  var iconPlus = formSearchHotel.querySelectorAll('.icon-plus');
  var iconMinus = formSearchHotel.querySelectorAll('.icon-minus');

  var buttonSearch = formSearchHotel.querySelector('.blue-btn');

  function clickButton(evt) {
    evt.preventDefault();
    formSearchHotel.classList.toggle('dates-and-people-appearance');
    fieldArrival.focus();
    fieldAdults.value = localStorage.getItem('adults') || 2;
    fieldChildren.value = localStorage.getItem('children') || 0;
  }

  function clickIconPlus(evt) {
    if (evt.target.htmlFor === 'adults') {
      if (+fieldAdults.value < 10) {
        fieldAdults.value++;
      } else {
        return;
      }
    }

    if (evt.target.htmlFor === 'children') {
      if (+fieldChildren.value < 10) {
        fieldChildren.value++;
      } else {
        return;
      }
    }
  }

  function clickIconMinus(evt) {
    if (evt.target.htmlFor === 'adults') {
      if (+fieldAdults.value > 0) {
        fieldAdults.value--;
        if (+fieldAdults.value <= 10) {
        fieldAdults.classList.remove('field-error');
        }
      } else {
        return;
      }
    }

    if (evt.target.htmlFor === 'children') {
      if (+fieldChildren.value > 0) {
        fieldChildren.value--;
        if (+fieldChildren.value <= 10) {
          fieldChildren.classList.remove('field-error');
        }
      } else {
        return;
      }
    }
  }

  function inputData(evt) {
    var goodNumber = /^\d+$/.exec(evt.target.value);

    if (!goodNumber || +goodNumber[0] > 10) {
      evt.target.classList.add('field-error');
    } else {
      evt.target.classList.remove('field-error');
    }
  }

  function submitForm(evt) {
    if (fieldAdults.classList.contains('field-error') || fieldChildren.classList.contains('field-error')) {
      evt.preventDefault();
    }

    localStorage.setItem('adults', fieldAdults.value);
    localStorage.setItem('children', fieldChildren.value);
  }

  function hideForm(evt) {
    if (evt.keyCode === 27 && formSearchHotel.classList.contains('dates-and-people-appearance')) {
      formSearchHotel.classList.remove('dates-and-people-appearance');
    }
  }

  formSearchHotel.addEventListener('submit', submitForm);
  buttonShowHotels.addEventListener('click', clickButton);
  fieldAdults.addEventListener('input', inputData);
  fieldChildren.addEventListener('input', inputData);
  window.addEventListener('keydown', hideForm);

  [].forEach.call(iconMinus, function(item) {
    item.addEventListener('click', clickIconMinus);
  });

  [].forEach.call(iconPlus, function(item) {
    item.addEventListener('click', clickIconPlus);
  });
})();
