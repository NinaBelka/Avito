'use strict';

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit');

// Открытие и закрытие модального окна подачи объявления
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');

  // Блокировка кнопки отправки
  modalBtnSubmit.disabled = true;
});

modalAdd.addEventListener('click', event => {
  const target = event.target;

  if (target.classList.contains('modal__close') || target === modalAdd) {
    modalAdd.classList.add('hide');

    // Очистка формы перед закрытием модального окна
    modalSubmit.reset();
  }


});



