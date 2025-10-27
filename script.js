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

// function to check if book already displayed or not by compare UUID on script and dom
// function checkBookExist(myBook) {
//     const displayedBook = cards.querySelectorAll('div > p:last-child');
//     displayedBook.forEach(item => {
//         if (item.textContent === myBook.UUID) {
//             return 'exist';
//         }
// });
// }

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
        const statusReading = book.hasRead ? 'Completed' : 'Reading';

        title.innerText = `${book.title}`;
        author.innerText = `Author: ${book.author}`;
        year.innerText = `Year: ${book.year}`;
        pages.innerText = `${book.pages} pages`;
        reading.innerText = `${statusReading}`;
        card.classList.add('card');
        card.setAttribute('data-UUID', book.UUID);
        delBtn.innerText = 'Remove book';
        delBtn.classList.toggle('del-book-btn')

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(year);
        card.appendChild(pages);
        card.appendChild(reading);
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

    const bookNew = [new Book(titleValue, authorValue, yearValue , pagesValue, hasReadValue)];

    addBookToLibrary(bookNew);

    displayBook(bookNew);
    formInsideDialog.reset();
    dialog.close();
})

displayBook(myLibrary);

cards.addEventListener('click', (e) => {
    if (!e.target.classList.contains('del-book-btn')) return;

    const currCardElement = e.target.closest('.card');
    if (!currCardElement) return;

    const currCardUUID = currCardElement.dataset.uuid;
    const objBookIdx = myLibrary.findIndex(item => item.UUID === currCardUUID);
    
    // remove from array myLibrary
    if (objBookIdx !== -1) {
        myLibrary.splice(objBookIdx, 1)
    }
    // remove from dom
    currCardElement.remove();
});

