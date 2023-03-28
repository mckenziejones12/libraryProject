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
  // set form back to default values
  form.reset();

  // current state here
  // form is hidden
  // form is reset to default values
  // myLibrary has new book added

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
    currentBook.bookId = `book${i}`;

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
    readBtn.setAttribute("id", `readBtnUnique${i}`);
    readBtn.setAttribute(
      "class",
      `readBtn ${currentBook.read ? " isRead" : "notIsRead"}`
    );
    readBtn.textContent = currentBook.read ? "Read" : "Not Read";

    readBtn.addEventListener("click", toggleRead);
    removeBtn.textContent = "Remove Book";
    removeBtn.setAttribute("id", `removeBtn${i}`);
    removeBtn.setAttribute("class", "removeBtn");
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

function toggleRead(e) {
  const bookIdOfReadButtonClicked = e.target.parentElement.id;
  const bookToUpdate = myLibrary.find(
    (bookInLibrary) => bookInLibrary.bookId === bookIdOfReadButtonClicked
  );

  const didRead = document.getElementById(e.target.id);
  if (didRead.textContent == "Read") {
    didRead.textContent = "Not Read";
    didRead.classList = "readBtn notIsRead";
    bookToUpdate.read = false;
  } else if (didRead.textContent == "Not Read") {
    didRead.textContent = "Read";
    didRead.classList = "readBtn isRead";
    bookToUpdate.read = true;
  }
}

function removeSingleBook(e) {
  const removeButton = e.target;
  const bookCardToRemoveId = removeButton.parentElement.id;

  // Give me all books not equal to book I want to remove
  // filter will give a copy of updated array, but NOT change original array
  // so re-assign myLibrary
  myLibrary = myLibrary.filter(
    (bookInLibrary) => bookInLibrary.bookId !== bookCardToRemoveId
  );

  displayLibraryBooks();
}

const sampleBooks = [
  new Book("hunger games", "some author", 2, true),
  new Book("harry potter", "another author", 3, false),
  new Book("some title", "yet another", 4, false),
];
myLibrary = sampleBooks;
displayLibraryBooks();
