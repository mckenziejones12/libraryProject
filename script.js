let myLibrary = [];

// grab elements and add event listeners
const addNewBookBtn = document.querySelector("#addNewBookBtn");
addNewBookBtn.addEventListener("click", popUpForm);

const submitBookBtn = document.querySelector("#submitBookBtn");
submitBookBtn.addEventListener("click", addBookToLibrary);

const title = document.querySelector("title");
const author = document.querySelector("author");
const pages = document.querySelector("pages");
const read = document.querySelector("read");

// form displays when "+ New Book" is clicked
function popUpForm() {
  const formContainer = document.getElementById("formContainer");
  formContainer.style.display = "block";
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // container holding form
  const formContainer = document.getElementById("formContainer");

  // the actual form
  const form = document.getElementById("popUpForm");
  const newBook = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
  );
  myLibrary.push(newBook);
  formContainer.style.display = "none";
  form.reset();

  displayLibraryBooks();
}

function displayLibraryBooks() {
  const display = document.getElementById("libraryContainer");
  //remove all items in library container
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  //add new array of books to library content
  for (let i = 0; i < myLibrary.length; i++) {
    const currentBook = myLibrary[i];
    // create a div for each item
    const bookCard = document.createElement("div");
    const titleDiv = document.createElement("h3");
    const authorDiv = document.createElement("p");
    const pagesDiv = document.createElement("p");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    // add text for each line item within div
    bookCard.classList.add("book");
    bookCard.setAttribute("id", `book${i}`);
    titleDiv.textContent = `${currentBook.title}`;
    authorDiv.textContent = `${currentBook.author}`;
    pagesDiv.textContent = `${currentBook.pages} pages`;
    readBtn.setAttribute("id", `isRead${i}`);
    readBtn.textContent = "Read";
    readBtn.addEventListener("click", toggleRead);
    removeBtn.textContent = "Remove Book";
    removeBtn.setAttribute("id", `removeBtn${i}`);
    removeBtn.addEventListener("click", removeSingleBook);
    // append div to container
    display.appendChild(bookCard);
    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    bookCard.appendChild(pagesDiv);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);
  }
}

// toggle function for read vs. not read
function toggleRead(e) {
  console.log(e.target.id);
  const didRead = document.getElementById(e.target.id);
  if (didRead.textContent == "Read") {
    didRead.textContent = "Not Read";
  } else if (didRead.textContent == "Not Read") {
    didRead.textContent = "Read";
  }
}

function removeSingleBook(e) {
  const removeButton = document.getElementById(e.target.id);
  const bookCardToRemove = removeButton.parentElement;
  bookCardToRemove.remove();
}

// setup fake data
const books = [
  {
    title: "bob",
    author: "ross",
    pages: 206,
    checked: false,
  },
  {
    title: "bob",
    author: "dude",
    pages: 83,
    checked: false,
  },
  {
    title: "michael",
    author: "bob",
    pages: 10,
    checked: true,
  },
];

myLibrary = books;

displayLibraryBooks();
