const myLibrary = [
  new Book('Animal farm', 'George Orwell', 1945, 141, true),
  new Book('Bumi', 'Tere Liye', 2014, 440, true),
];

// Book object constructor
function Book(title, author, year, pages, hasRead) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.hasRead = hasRead;
    this.UUID = crypto.randomUUID();

}

// Add book to library function
function addBookToLibrary(bookList) {
    for (let item of bookList) {
        myLibrary.push(item);
    }
}

const cards = document.querySelector('.cards');

// function to loop through array books then display on card
function displayBook(myLib) {
    myLib.forEach(book => {
        const card = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('p');
        const year = document.createElement('p');
        const pages = document.createElement('p');
        const reading = document.createElement('p');
        const delBtn = document.createElement('button');
        const statusToggleBtn = document.createElement('button');
        const statusReading = book.hasRead ? 'Completed' : 'Reading';

        title.innerText = `${book.title}`;
        author.innerText = (book.author === "") ? 'Author: -' : `Author: ${book.author}`;
        year.innerText = (Number.isNaN(book.year)) ? 'Year: -': `Year: ${book.year}`;
        pages.innerText = (Number.isNaN(book.pages)) ? '- Pages' : `${book.pages} pages`;
        reading.innerText = `Status: ${statusReading}`;
        card.classList.add('card');
        card.setAttribute('data-UUID', book.UUID);
        delBtn.innerText = 'Remove book';
        delBtn.classList.toggle('del-book-btn');
        statusToggleBtn.innerText = 'Change status';
        statusToggleBtn.classList.toggle('status-toggle-btn')

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(year);
        card.appendChild(pages);
        card.appendChild(reading);
        card.appendChild(statusToggleBtn);
        card.appendChild(delBtn);
        cards.appendChild(card)
})
};


const newBookBtn = document.querySelector('#new-book-btn');
const dialog = document.querySelector('#new-book-dialog');
const closeBtn = document.querySelector('form button');
const confirmBtn = dialog.querySelector('#confirmBtn');
const formInsideDialog = dialog.querySelector('form');
const inputForm = dialog.querySelectorAll('.form-row input');

// "Show the new book dialog form" button opens the <dialog> modally
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault(); // We dont want to submit this fake form

    const titleValue = inputForm[0].value;
    const authorValue = inputForm[1].value;
    const yearValue = parseInt(inputForm[2].value);
    const pagesValue = parseInt(inputForm[3].value);
    const hasReadValue = inputForm[4].checked;

    // form validation
    const isValid = formInsideDialog.checkValidity();
    if (!isValid) {
        formInsideDialog.reportValidity();
        return;
    }

    const bookNew = [new Book(titleValue, authorValue, yearValue , pagesValue, hasReadValue)];

    addBookToLibrary(bookNew);

    displayBook(bookNew);
    formInsideDialog.reset();
    dialog.close();
})

displayBook(myLibrary);

// function to get book obj index and dom element by getting their uuid
function getBookDomAndObj(e) {
    const cardElement = e.target.closest('.card');
    if (!cardElement) return;

    const cardUUID = cardElement.dataset.uuid;
    const objBookIdx = myLibrary.findIndex(item => item.UUID === cardUUID);
    return [cardElement, objBookIdx];
}

// Remove book function for each card
cards.addEventListener('click', (e) => {
    if (!e.target.classList.contains('del-book-btn')) return;

    const [cardElement, objBookIdx] = getBookDomAndObj(e);
    
    // remove from array myLibrary
    if (objBookIdx !== -1) {
        myLibrary.splice(objBookIdx, 1)
    }

    // remove from dom
    cardElement.remove();
});

// Book prototype change status function to toggle reading status
Book.prototype.changeStatus = function() {
    this.hasRead = !this.hasRead;
};

// change reading status for each card
function changeStatus(e) {
    if (!e.target.classList.contains('status-toggle-btn')) return;

   const [cardElement, objBookIdx] = getBookDomAndObj(e);

   if (objBookIdx !== -1) {
    myLibrary[objBookIdx].changeStatus();
   }

   if (myLibrary[objBookIdx].hasRead === true) {
    cardElement.childNodes[4].innerText = 'Status: Completed';
   } else {
    cardElement.childNodes[4].innerText = 'Status: Reading'
   }

};

cards.addEventListener('click', changeStatus);

