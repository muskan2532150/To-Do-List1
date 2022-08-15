import Display from '../module/Display.js';
import './style.css';
import LocalStorage from '../module/LocalStorage.js';

const form = document.querySelector('.forms');
const listContainer = document.querySelector('.showList');
const clearbtn = document.querySelector('.clearBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const des = document.getElementById('desc').value;
  const index = LocalStorage.idGenerator();
  const id = LocalStorage.idGenerator();
  const task = { des, index, id };
  Display.addList(task, id);
  LocalStorage.addLocal(task);
  document.getElementById('desc').value = '';
});

listContainer.addEventListener('click', (e) => {
  const eventClass = e.target.className;

  if (eventClass === 'mycheckbox') {
    e.target.nextSibling.classList.toggle('active');
    Display.changebool(e.target.id);
  } else if (eventClass === 'displayP') {
    const list = LocalStorage.getlist();
    const eventinput = e.target.previousSibling.id;

    e.target.addEventListener('change', (e) => {
      list[eventinput - 1].des = e.target.value;
      localStorage.setItem('list', JSON.stringify(list));
    });
  } else {
    // console.log( e.target.parentNode.previousSibling.firstChild.id); for
    const removebtn = [...document.querySelectorAll('.showList > .list')].findIndex((element) => element === e.target.parentNode.parentNode);
    Display.renameLocal(removebtn + 1, e.target);
  }
});

clearbtn.addEventListener('click', () => {
  Display.clearAll();
  LocalStorage.clearLocal();
});

function displayFirst() {
  const list = LocalStorage.getlist();
  list.forEach((task, index) => {
    Display.addList(task, task.id);
    const nodeList = document.querySelectorAll('.displayP');
    const nodeListCheckbox = document.querySelectorAll('.mycheckbox');
    const elements = [...nodeList];
    const checkBoxList = [...nodeListCheckbox];
    if (task.bool) {
      elements[index].classList.toggle('active');
      checkBoxList[index].setAttribute('checked', '');
    }
  });
}

displayFirst();
