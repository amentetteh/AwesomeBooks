import {books} from '../data/books.js';

const createTag = (tagName, textContent = null, className = null) => {
  const tag = document.createElement(tagName);
  tag.textContent = textContent;
  tag.className = className;
  return tag;
};

const booksTable = document.querySelector('#booksTable');

const buttonAdd = document.querySelector('#addbutton');

const createBookRow = (bookName, bookAuthor) => {
  const divName = createTag('div', null, 'divName');
  const divAuthor = createTag('div', null, 'divAuthor');
  const buttonRemove = createTag('button', 'Remove', 'buttonRemove');
  const hr = document.createElement('hr');
  const bookRow = createTag('div', null, 'bookRow');
  divName.textContent = bookName;
  divAuthor.textContent = bookAuthor;

  const cardItems = [divName, divAuthor, buttonRemove, hr];

  for (let j = 0; j < cardItems.length; j += 1) {
    bookRow.appendChild(cardItems[j]);
  }

  buttonRemove.addEventListener('click', (event) => {
    const target = event.target;
    const book = target.parentNode.getElementsByTagName('div');
    const author = book[0].innerHTML;
    const title = book[1].innerHTML;
    // Remove from data
    removeBook(author, title);
    // Remove from UI
    removeBookFromUI(target);
  });
  return bookRow;
};

const buildBookSection = (bookList) => {
  if (bookList && bookList.length > 0) {
    for (let i = 0; i < bookList.length; i += 1) {
      booksTable.appendChild(
          createBookRow(bookList[i].Name, bookList[i].Author),
      );
    }
  }
};

const addBook = (name, author) => {
  const books = JSON.parse(localStorage.getItem('books')) || [];
  books.push({Name: name, Author: author});
  localStorage.setItem('books', JSON.stringify(books));
};

const addBookToUI = (name, author) => {
  console.log(booksTable);
  booksTable.appendChild(createBookRow(name, author));
};

const removeBook = (name, author) => {
  const books = JSON.parse(localStorage.getItem('books'));
  const newBooks = books.filter((item, index, books) => {
    return !((item.Name === name) & (item.Author === author));
  });
  localStorage.setItem('books', JSON.stringify(newBooks));
};
const removeBookFromUI = (item) => {
  if (item.classList.contains('buttonRemove')) {
    item.parentElement.remove();
  }
};

const clearForm = () => {
  document.querySelector('#booktitle').value = '';
  document.querySelector('#bookauthor').value = '';
};

buttonAdd.addEventListener('click', (event) => {
  const fields = document.querySelectorAll('input');
  const title = fields[0].value;
  const author = fields[1].value;
  // Add to local storage
  addBook(title, author);
  addBookToUI(title, author);
  clearForm();
});

// Display Books on page load
if (books.length > 0) {
  document.addEventListener('DOMContentLoaded', buildBookSection(books));
}
