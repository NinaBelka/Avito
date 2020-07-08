'use strict';

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning');

// Массив поданных объявлений
const dataBase = [];


// Проверка заполнения полей модального окна подачи объявления

// Получение полей
const elementsModalSubmit = [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

modalSubmit.addEventListener('input', () => {

// Проверка заполнения полей

  // Проверка формы модального окна подачи объявления на заполнение всех полей через тернарный оператор
  const validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';

  // Проверка формы через if 
  // if (validForm) {
  //   modalBtnWarning.style.display = 'none';
  // } else {
  //   modalBtnWarning.style.display = '';
  // }
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  dataBase.push(itemObj);
  modalSubmit.reset();
});

// Закрытие модальных окон подачи объявлений и карточки товара
const closeModal = function (event) {
  const target = event.target;

  if (target.closest('.modal__close') || target === this) {
    this.classList.add('hide');

    // Очистка формы перед закрытием модального окна
    if (this === modalAdd) {
      modalSubmit.reset();
    }
  }
};

// Закрытие модальных окон подачи объявлений и карточки товара по кнопке esc
const closeModalEsc = event => {
  if (event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModalEsc);
  }
};

// Открытие модального окна подачи объявления
addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');

  // Блокировка кнопки отправки
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModalEsc);

});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);


// Открытие модального окна карточки товара
catalog.addEventListener('click', event => {
  const target = event.target;

  if (target.closest('.card')) {
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModalEsc);
  }
});