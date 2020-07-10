'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() { }; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  catalog = document.querySelector('.catalog'),
  modalItem = document.querySelector('.modal__item'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  modalFileInput = document.querySelector('.modal__file-input'),
  modalFileBtn = document.querySelector('.modal__file-btn'),
  modalImageAdd = document.querySelector('.modal__image-add'),
  searchInput = document.querySelector('.search__input'),
  menuContainer = document.querySelector('.menu__container'); // Получение элементов модального окна карточки товара

var modalImageItem = document.querySelector('.modal__image-item'),
  modalHeaderItem = document.querySelector('.modal__header-item'),
  modalStatusItem = document.querySelector('.modal__status-item'),
  modalDescriptionItem = document.querySelector('.modal__description-item'),
  modalCostItem = document.querySelector('.modal__cost-item');
var textFileBtn = modalFileBtn.textContent;
var srcModalImage = modalImageAdd.src; // Массив поданных объявлений

var dataBase = JSON.parse(localStorage.getItem('awito')) || [];
var counter = dataBase.length; // Проверка заполнения полей модального окна подачи объявления
// Получение полей

var elementsModalSubmit = _toConsumableArray(modalSubmit.elements).filter(function (elem) {
  return elem.tagName !== 'BUTTON' && elem.type !== 'submit';
});

var infoPhoto = {}; // Сохранение данных в localStorage

var saveDB = function saveDB() {
  return localStorage.setItem('awito', JSON.stringify(dataBase));
}; // Проверка заполнения полей


var checkForm = function checkForm() {
  var validForm = elementsModalSubmit.every(function (elem) {
    return elem.value;
  });
  modalBtnSubmit.disabled = !validForm; // Проверка формы модального окна подачи объявления на заполнение всех полей через тернарный оператор

  modalBtnWarning.style.display = validForm ? 'none' : ''; // Проверка формы через if 
  // if (validForm) {
  //   modalBtnWarning.style.display = 'none';
  // } else {
  //   modalBtnWarning.style.display = '';
  // }
};

modalSubmit.addEventListener('input', checkForm); // Закрытие модальных окон подачи объявлений и карточки товара

var closeModal = function closeModal(event) {
  var target = event.target;

  if (target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
}; // Перебор заполненных карточек


var renderCard = function renderCard() {
  var DB = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : dataBase;
  catalog.textContent = '';
  DB.forEach(function (item) {
    catalog.insertAdjacentHTML('beforeend', "\n    \t\t<li class=\"card\" data-id = \"".concat(item.id, "\">\n\t\t\t\t\t<img class=\"card__image\" src=\"data:image/jpeg;base64,").concat(item.image, "\" alt=\"test\">\n\t\t\t\t\t<div class=\"card__description\">\n\t\t\t\t\t\t<h3 class=\"card__header\">").concat(item.nameItem, "</h3>\n\t\t\t\t\t\t<div class=\"card__price\">").concat(item.costItem, " \u20BD</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n    "));
  });
}; // Поиск товаров


searchInput.addEventListener('input', function () {
  var valueSearch = searchInput.value.trim().toLowerCase();

  if (valueSearch.length > 2) {
    var result = dataBase.filter(function (item) {
      return item.nameItem.toLowerCase().includes(valueSearch) || item.descriptionItem.toLowerCase().includes(valueSearch);
    });
    renderCard(result);
  }
}); // Получение фото

modalFileInput.addEventListener('change', function (event) {
  var target = event.target;
  var reader = new FileReader();
  var file = target.files[0];
  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;
  reader.readAsBinaryString(file);
  reader.addEventListener('load', function (event) {
    if (infoPhoto.size < 200000) {
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = "data:image/jpeg;base64,".concat(infoPhoto.base64);
    } else {
      modalFileBtn.textContent = 'Файл не должен превышать 200кб';
      modalFileInput.value = '';
      checkForm();
    }
  });
}); // Сбор информации из формы

modalSubmit.addEventListener('submit', function (event) {
  event.preventDefault();
  var itemObj = {};

  var _iterator = _createForOfIteratorHelper(elementsModalSubmit),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elem = _step.value;
      itemObj[elem.name] = elem.value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  itemObj.id = counter++;
  itemObj.image = infoPhoto.base64;
  dataBase.push(itemObj);
  closeModal({
    target: modalAdd
  });
  saveDB();
  renderCard();
}); // Открытие модального окна подачи объявления

addAd.addEventListener('click', function () {
  modalAdd.classList.remove('hide'); // Блокировка кнопки отправки

  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModal);
}); // Открытие и заполнение модального окна карточки товара

catalog.addEventListener('click', function (event) {
  var target = event.target;
  var card = target.closest('.card');

  if (card) {
    var item = dataBase.find(function (obj) {
      return obj.id === +card.dataset.id;
    });
    modalImageItem.src = "data:image/jpeg;base64,".concat(item.image);
    modalHeaderItem.textContent = item.nameItem;
    modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/У';
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal);
  }
}); // Меню категорий в шапке

menuContainer.addEventListener('click', function (event) {
  var target = event.target;

  if (target.tagName === 'A') {
    var result = dataBase.filter(function (item) {
      return item.category === target.dataset.category;
    });
    renderCard(result);
  }
});
modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
renderCard();