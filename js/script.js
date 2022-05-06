// eslint-disable-next-line import/extensions
import allKeysList from './keys-list.js';
// eslint-disable-next-line import/extensions
import CapsKeysList from './caps-keys-list.js';
// eslint-disable-next-line import/extensions
import ShiftKeysList from './shift-keys-list.js';

const body = document.querySelector('body');

const PAGE_STRUCTURE = {
  h1: 'caption',
  textarea: 'textarea',
  div: 'keyboard-containet',
  p: 'description',
};

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
                        Каб пераключыцца на іншую мову: левыя Shift + Alt`;

// create all keys

Object.entries(allKeysList['be']).forEach((el) => {
  const curr = document.createElement('div');
  curr.className = `key ${el[0]}`;
  curr.innerHTML = `${el[1]}`;
  keyboardContainet.appendChild(curr);
});

const keys = document.querySelectorAll('.key');
textarea.onkeydown = function (event) {
  console.log(event.shiftKey);
  // console.log(`key${event.key}`);
  console.log(event.code);
};
