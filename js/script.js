/* eslint-disable no-multi-assign */
// eslint-disable-next-line import/extensions
import allKeysList from './keys-list.js';
// eslint-disable-next-line import/extensions
import CapsKeysList from './caps-keys-list.js';
// eslint-disable-next-line import/extensions
import ShiftKeysList from './shift-keys-list.js';

const body = document.querySelector('body');
let language = localStorage.getItem('lang') || 'be';

const PAGE_STRUCTURE = {
  p: 'description',
  div: 'keyboard-containet',
  textarea: 'textarea',
  h1: 'caption',
};

function toUpperCapsLetter() {
  // eslint-disable-next-line no-use-before-define
  keys.forEach((el) => {
    const curr = el.id;
    // eslint-disable-next-line no-prototype-builtins
    if (CapsKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${CapsKeysList[`${language}`][curr].toUpperCase()}`;
    }
  });
}

function toLowerCapsLetter() {
  // eslint-disable-next-line no-use-before-define
  keys.forEach((el) => {
    const curr = el.id;
    // eslint-disable-next-line no-prototype-builtins
    if (CapsKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${CapsKeysList[`${language}`][curr].toLowerCase()}`;
    }
  });
}

function shiftEvent() {
  // eslint-disable-next-line no-use-before-define
  keys.forEach((el) => {
    const curr = el.id;
    // eslint-disable-next-line no-prototype-builtins
    if (ShiftKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${ShiftKeysList[`${language}`][curr].toUpperCase()}`;
    }
  });
}

// create main structure

Object.entries(PAGE_STRUCTURE).forEach((el) => {
  const curr = document.createElement(`${el[0]}`);
  curr.className = `${el[1]}`;
  body.prepend(curr);
});

const caption = document.querySelector('.caption');
const textarea = document.querySelector('.textarea');
textarea.focus();
let cursorPosition = textarea.selectionStart;
const keyboardContainet = document.querySelector('.keyboard-containet');
const description = document.querySelector('.description');

// add content in caption and description

caption.innerHTML = 'RSS віртуальная клавіятура';
description.innerHTML = `Клавіятура створана ў аперацыйнай сістэме Windows
                        Каб пераключыцца на іншую мову: левыя Ctrl + Alt`;

// create all keys-container

function createKeysContainer() {
  Object.entries(allKeysList[`${language}`]).forEach((el) => {
    const curr = document.createElement('div');
    curr.className = `key ${el[0]}`;
    curr.id = `${el[0]}`;
    keyboardContainet.appendChild(curr);
  });
}
createKeysContainer();

const keys = document.querySelectorAll('.key');
const capsLock = document.querySelector('.CapsLock');

// create all keys-content

function createKeysContent() {
  keys.forEach((el) => {
    const curr = el.id;
    // eslint-disable-next-line no-prototype-builtins
    if (allKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${allKeysList[`${language}`][curr]}`;
    }
  });
}
createKeysContent();

// --- KEYDOWN EVENTS ---

window.addEventListener('keydown', (event) => {
  textarea.focus();
  // animation
  const currEl = document.querySelector(`.${event.code}`);
  currEl.classList.add('active');

  // CAPS LOCK key event
  if (event.key === 'CapsLock') {
    capsLock.classList.toggle('caps-active');

    if (capsLock.classList.contains('caps-active')) {
      toUpperCapsLetter();
    } else {
      toLowerCapsLetter();
    }
  }

  // shift key event
  if (event.key === 'Shift') {
    shiftEvent();
  }

  // change language
  if (event.ctrlKey && event.altKey) {
    if (localStorage.getItem('lang') === 'be') {
      localStorage.setItem('lang', 'en');
      language = localStorage.getItem('lang');
    } else {
      localStorage.setItem('lang', 'be');
      language = localStorage.getItem('lang');
    }
    createKeysContent();
    capsLock.classList.remove('caps-active');
  }

  // input text in textarea
  // eslint-disable-next-line no-prototype-builtins
  if (ShiftKeysList[`${language}`].hasOwnProperty(currEl.id)) {
    event.preventDefault();
    cursorPosition = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPosition)
      + currEl.textContent
      + textarea.value.slice(cursorPosition);
    // eslint-disable-next-line no-multi-assign
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 1;
  }

  // TAB KEY input text in textarea
  if (event.key === 'Tab') {
    event.preventDefault();
    cursorPosition = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(
      0,
      cursorPosition,
    )}    ${textarea.value.slice(cursorPosition)}`;
    // eslint-disable-next-line no-multi-assign
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 4;
  }
});

// --- KEYUP EVENTS ---
window.addEventListener('keyup', (event) => {
  // animation
  keys.forEach((el) => {
    if (el.classList.contains('caps-active')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // shift key event
  if (event.key === 'Shift') {
    if (capsLock.classList.contains('caps-active')) {
      toUpperCapsLetter();
    } else {
      createKeysContent();
    }
  }
});

// --- MOUSEDOWN EVENTS ---

keyboardContainet.addEventListener('mousedown', (event) => {
  const currEl = document.querySelector(`.${event.target.id}`);
  // animation
  keys.forEach((el) => {
    if (el.classList.contains('caps-active')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
  event.target.classList.add('active');

  // CAPS LOCK mouse event
  if (event.target.classList.contains('CapsLock')) {
    event.target.classList.toggle('caps-active');

    if (event.target.classList.contains('caps-active')) {
      toUpperCapsLetter();
    } else {
      toLowerCapsLetter();
    }
  }

  // shift key event
  if (
    event.target.classList.contains('ShiftLeft')
    || event.target.classList.contains('ShiftRight')
  ) {
    shiftEvent();
  }

  // input text in textarea
  // eslint-disable-next-line no-prototype-builtins
  if (ShiftKeysList[`${language}`].hasOwnProperty(currEl.id)) {
    cursorPosition = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPosition)
      + currEl.textContent
      + textarea.value.slice(cursorPosition);
    // eslint-disable-next-line no-multi-assign
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 1;
  }

  // TAB KEY input text in textarea
  if (event.target.id === 'Tab') {
    cursorPosition = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(
      0,
      cursorPosition,
    )}    ${textarea.value.slice(cursorPosition)}`;
    // eslint-disable-next-line no-multi-assign
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 4;
  }

  // SPACE KEY input text in textarea
  if (event.target.id === 'Space') {
    cursorPosition = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(
      0,
      cursorPosition,
    )} ${textarea.value.slice(cursorPosition)}`;
    // eslint-disable-next-line no-multi-assign
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 1;
  }

  // BACKSPACE KEY input text in textarea
  if (event.target.id === 'Backspace') {
    cursorPosition = textarea.selectionStart;
    if (cursorPosition > 0) {
      textarea.value = textarea.value.slice(0, cursorPosition - 1)
        + textarea.value.slice(cursorPosition);
      textarea.selectionStart = textarea.selectionEnd = cursorPosition -= 1;
    } else {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition = 0;
    }
  }

  // DEL KEY input text in textarea
  if (event.target.id === 'Delete') {
    cursorPosition = textarea.selectionStart;
    if (cursorPosition < textarea.value.length) {
      textarea.value = textarea.value.slice(0, cursorPosition)
        + textarea.value.slice(cursorPosition + 1);
      textarea.selectionStart = textarea.selectionEnd = cursorPosition;
    } else {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition = textarea.value.length;
    }
  }

  // ENTER KEY input text in textarea
  if (event.target.id === 'Enter') {
    cursorPosition = textarea.selectionStart;
    textarea.value = `${textarea.value.slice(
      0,
      cursorPosition,
    )}\n${textarea.value.slice(cursorPosition)}`;
    // eslint-disable-next-line max-len
    textarea.selectionStart = textarea.selectionEnd = cursorPosition = textarea.value.slice(0, cursorPosition).length + 1;
  }

  // ArrowRight KEY input text in textarea
  if (event.target.id === 'ArrowRight') {
    if (cursorPosition < textarea.value.length) {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition += 1;
    } else {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition = textarea.value.length;
    }
  }

  // ArrowLeft KEY input text in textarea
  if (event.target.id === 'ArrowLeft') {
    if (cursorPosition > 0) {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition -= 1;
    } else {
      textarea.selectionStart = textarea.selectionEnd = cursorPosition = 0;
    }
  }

  // ArrowUp KEY input text in textarea
  if (event.target.id === 'ArrowUp' || event.target.id === 'ArrowDown') {
    cursorPosition = textarea.selectionStart;
    textarea.value = textarea.value.slice(0, cursorPosition)
      + currEl.textContent
      + textarea.value.slice(cursorPosition);
    textarea.selectionStart = textarea.selectionEnd = cursorPosition += 1;
  }
});

// --- MOUSEUP EVENTS ---

keyboardContainet.addEventListener('mouseup', (event) => {
  textarea.focus();
  // animation
  keys.forEach((el) => {
    if (el.classList.contains('caps-active')) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // shift key event
  if (
    event.target.classList.contains('ShiftLeft')
    || event.target.classList.contains('ShiftRight')
  ) {
    if (capsLock.classList.contains('caps-active')) {
      toUpperCapsLetter();
    } else {
      createKeysContent();
    }
  }
});
