const addNewBook = document.querySelector('.new-book');
const mainSection = document.querySelector('.container');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const addButton = document.querySelector('.add');
const cancelButton = document.querySelector('.cancel');

const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }

addNewBook.addEventListener('click', function() {
    modal.style.display = 'block';
});

closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
});

addButton.addEventListener('click', function() {
    let titleValue = document.querySelector('.title').value;
    let authorValue = document.querySelector('.author').value;
    let pagesValue = document.querySelector('.pages').value;

    if (titleValue.trim() === '' || isNaN(pagesValue)) {
        alert('Please enter valid data.');
        return; // Do not proceed with adding the book if validation fails
    }

    let newBook = new Book(titleValue, authorValue, pagesValue);

    myLibrary.push(newBook);

    updateDisplay();

    document.querySelector('.modal form').reset();

    modal.style.display = 'none';
})  

cancelButton.addEventListener('click', function() {
    document.querySelector('.modal form').reset();
    modal.style.display = 'none';
})

function updateDisplay() {
    myLibrary.forEach(book => {
        const bookCard = createBookCard(book);

        mainSection.appendChild(bookCard);
    })
}

function createBookCard(book) {
    const cardSection = document.createElement('div');
    cardSection.classList.add('book-card');

    cardSection.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button class="read-toggle">Read/Not Read</button>
        <button class="delete">Delete</button>
    `;

    return cardSection;
}