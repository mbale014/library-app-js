// Book object constructor
class Book {

    constructor(title, author, year, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.hasRead = hasRead;
        this.UUID = crypto.randomUUID(); //This generate different random UUID 
    }

    // Method to change reading status of the book
    changeStatus() {
        this.hasRead = !this.hasRead;
    };
};

// Library object class for storing books
class Library {
    #bookList = []

    addBook(item) {
        if (!(item instanceof Book)) {
            console.log('Error: Object must be an instance of Book');
            return;
        };
        return this.#bookList.push(item)
    }

    delBook(idx) {
        return this.#bookList.splice(idx, 1);
    }

    findIndex(uniqueID) {
        return this.#bookList.findIndex(item => item.UUID === uniqueID)
    }

    get bookList() {
        return [...this.#bookList];
    }
};

//Create Library instance
const myLibrary = new Library();

//Premade books
const animalFarm = new Book('Animal farm', 'George Orwell', 1945, 141, true);
const bumi = new Book('Bumi', 'Tere Liye', 2014, 440, true);
const filosofiTeras = new Book('Filosofi teras', 'Henry Manampiring', 2018, 344, true);
const shogunSaga = new Book('Shōgun saga', 'James Clavell', 1975, 1152, true);
const poppyWar = new Book('The Poppy war #1-3', 'R.F. Kuang', 2021, NaN, false);

//Adding premade books to myLibrary instance
myLibrary.addBook(animalFarm);
myLibrary.addBook(bumi);
myLibrary.addBook(filosofiTeras);
myLibrary.addBook(shogunSaga);
myLibrary.addBook(poppyWar);


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
        delBtn.innerText = 'Remove';
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
    myLibrary.addBook(bookNew[0]);

    displayBook(bookNew);
    formInsideDialog.reset();
    dialog.close();
})

//Initialize display book
displayBook(myLibrary.bookList);

// function to get book obj index and dom element by getting their uuid
function getBookDomAndObj(e) {
    const cardElement = e.target.closest('.card');
    if (!cardElement) return;

    const cardUUID = cardElement.dataset.uuid;
    const objBookIdx = myLibrary.findIndex(cardUUID);
    return [cardElement, objBookIdx];
}

// Remove book function for each card
cards.addEventListener('click', (e) => {
    if (!e.target.classList.contains('del-book-btn')) return;

    // Display confirmation windows
    if (confirm("Are you sure you want to remove book?")) {
         const [cardElement, objBookIdx] = getBookDomAndObj(e);
    
        // remove from array myLibrary
        if (objBookIdx !== -1) {
            myLibrary.delBook(objBookIdx)
        }

        // remove from dom
        cardElement.remove();
    };

});

// change reading status for each card
function changeStatus(e) {
    if (!e.target.classList.contains('status-toggle-btn')) return;

    const books = myLibrary.bookList;
   const [cardElement, objBookIdx] = getBookDomAndObj(e);

   if (objBookIdx !== -1) {
    books[objBookIdx].changeStatus();
   }

   if (books[objBookIdx].hasRead === true) {
    cardElement.childNodes[4].innerText = 'Status: Completed';
   } else {
    cardElement.childNodes[4].innerText = 'Status: Reading'
   }

};

cards.addEventListener('click', changeStatus);

// Project credit
const supportIcon = document.querySelector('#support-logo');
supportIcon.addEventListener('click', () => {
    alert('Made by M. Iqbal -- @ odin project library app');
    window.open('https://github.com/mbale014', '_blank');
})