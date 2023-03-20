let myLibrary = ["book1", "book2", "book3"];

//grab elements, create form, add event listeners
const addNewBtn = document.querySelector("#addNewBtn");
addNewBtn.addEventListener("click", popUpForm);

function popUpForm() {
  const form = document.getElementById("popUpForm");
  form.style.display = "block";
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBook() {
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
  }
}

function newBook() {}
