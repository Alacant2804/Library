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
})  

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

    cardSection.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <button class="read-toggle">Read</button>
        <button class="remove">Remove</button>
    `;

    const readToggleBtn = cardSection.querySelector('.read-toggle');
    const removeButton = cardSection.querySelector('.remove');


    readToggleBtn.addEventListener('click', function(){
        if (readToggleBtn.textContent === "Read") {
            readToggleBtn.textContent = "Not Read";
        } else {
            readToggleBtn.textContent = "Read";                 
        }
    });

    removeButton.addEventListener('click', function() {
        // Find the corresponding book in myLibrary based on the button's position in the DOM
        const card = removeButton.closest('.book-card');
        const index = Array.from(bookContainer.children).indexOf(card);
        
        card.remove();
        // Ensure the index is valid
        if (index !== -1 && index < myLibrary.length) {
            // Remove the book from myLibrary
            myLibrary.splice(index, 1);
            
            // Update the display to reflect the removal
            updateDisplay();
        }
    });

    return cardSection;
}

