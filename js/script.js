// eslint-disable-next-line import/extensions
import allKeysList from './keys-list.js';
// eslint-disable-next-line import/extensions
import CapsKeysList from './caps-keys-list.js';
// eslint-disable-next-line import/extensions
import ShiftKeysList from './shift-keys-list.js';

const body = document.querySelector('body');
let language = localStorage.getItem('lang') || 'be';

const PAGE_STRUCTURE = {
  h1: 'caption',
  textarea: 'textarea',
  div: 'keyboard-containet',
  p: 'description',
};

function toUpperCapsLetter() {
  keys.forEach((el) => {
    let curr = el.id;
    if (CapsKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${CapsKeysList[`${language}`][curr].toUpperCase()}`;
    }
  });
}

function toLowerCapsLetter() {
  keys.forEach((el) => {
    let curr = el.id;
    if (CapsKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${CapsKeysList[`${language}`][curr].toLowerCase()}`;
    }
  });
}

// create main structure

Object.entries(PAGE_STRUCTURE).forEach((el) => {
  const curr = document.createElement(`${el[0]}`);
  curr.className = `${el[1]}`;
  body.appendChild(curr);
});

const caption = document.querySelector('.caption');
const textarea = document.querySelector('.textarea');
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
    let curr = el.id;
    if (allKeysList[`${language}`].hasOwnProperty(curr)) {
      el.innerHTML = '';
      el.innerHTML += `${allKeysList[`${language}`][curr]}`;
    }
  });
}
createKeysContent();

// --- KEYDOWN EVENTS ---

window.addEventListener('keydown', function (event) {
  // animation
  let currEl = document.querySelector(`.${event.code}`);
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
    keys.forEach((el) => {
      let curr = el.id;
      if (ShiftKeysList[`${language}`].hasOwnProperty(curr)) {
        el.innerHTML = '';
        el.innerHTML += `${ShiftKeysList[`${language}`][curr].toUpperCase()}`;
      }
    });
  }

  // change language
  if (event.ctrlKey && event.altKey) {
    if (localStorage.getItem('lang') === 'be') {
      localStorage.setItem('lang', 'en');
      console.log(language);
    } else {
      localStorage.setItem('lang', 'be');
    }
    document.location.reload();
  }
});

// --- KEYUP EVENTS ---
window.addEventListener('keyup', function (event) {
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

keyboardContainet.addEventListener('mousedown', function (event) {
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
    event.target.classList.contains('ShiftLeft') ||
    event.target.classList.contains('ShiftRight')
  ) {
    keys.forEach((el) => {
      let curr = el.id;
      if (ShiftKeysList[`${language}`].hasOwnProperty(curr)) {
        el.innerHTML = '';
        el.innerHTML += `${ShiftKeysList[`${language}`][curr].toUpperCase()}`;
      }
    });
  }
});

// --- MOUSEUP EVENTS ---

keyboardContainet.addEventListener('mouseup', function (event) {
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
    event.target.classList.contains('ShiftLeft') ||
    event.target.classList.contains('ShiftRight')
  ) {
    if (capsLock.classList.contains('caps-active')) {
      toUpperCapsLetter();
    } else {
      createKeysContent();
    }
  }
});
