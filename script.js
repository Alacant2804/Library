const addNewBook = document.querySelector('.new-book');
const mainSection = document.querySelector('.container');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');
const addButton = document.querySelector('.add');
const cancelButton = document.querySelector('.cancel');
const bookContainer = document.querySelector('.book-container');

const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = true;
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
});


cancelButton.addEventListener('click', function() {
    document.querySelector('.modal form').reset();
    modal.style.display = 'none';
})

function updateDisplay() {
    bookContainer.innerHTML = '';

    myLibrary.forEach(book => { 
        const bookCard = createBookCard(book);

        bookContainer.appendChild(bookCard);
    })
}

function createBookCard(book) {
    const cardSection = document.createElement('div');
    cardSection.classList.add('book-card');

    // Determine initial border color based on initial read status
    const initialBorderColor = book.read ? 'green' : 'red';

    cardSection.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button class="read-toggle">Read</button>
        <button class="remove">Remove</button>
    `;

    // Set the initial border color
    cardSection.style.borderColor = initialBorderColor;

    const readToggleBtn = cardSection.querySelector('.read-toggle');

    readToggleBtn.addEventListener('click', function(){
        // Toggle the read status
        book.read = !book.read;
        // Update the border color based on the new read status
        cardSection.style.borderColor = book.read ? 'green' : 'red';

        if (readToggleBtn.textContent === "Read") {
            readToggleBtn.textContent = "Not Read";
        } else {
            readToggleBtn.textContent = "Read";
        }
    });

    const removeButton = cardSection.querySelector('.remove');

    removeButton.addEventListener('click', function() {
        const index = myLibrary.indexOf(book);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            updateDisplay();
        }
    });

    return cardSection;
}
