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
function addBookToLibrary(bookTitle, bookAuthor, bookYear, bookPages, bookhasRead) {
    let newBook = new Book(bookTitle, bookAuthor, bookYear, bookPages, bookhasRead);
    myLibrary.push(newBook);
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
    const statusReading = book.hasRead ? 'Completed' : 'Reading';

    title.innerText = `${book.title}`;
    author.innerText = `Author: ${book.author}`;
    year.innerText = `Year: ${book.year}`;
    pages.innerText = `${book.pages} pages`;
    reading.innerText = `${statusReading}`

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(year);
    card.appendChild(pages);
    card.appendChild(reading);
    cards.appendChild(card)
    
})
};

displayBook(myLibrary);

const newBookBtn = document.querySelector('#new-book-btn');
const dialog = document.querySelector('#new-book-dialog');
const closeBtn = document.querySelector('form button');
const confirmBtn = dialog.querySelector('#confirmBtn');
const inputForm = dialog.querySelectorAll('.form-row input');
const outputBoxTest = document.querySelector('dialog + p + p')


// "Show the new book dialog form" button opens the <dialog> modally
newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event
dialog.addEventListener('close', (e) => {
    outputBoxTest.value = 
        dialog.returnValue === 'default' 
            ? 'No return value' 
            : `ReturnValue: ${dialog.returnValue}.` // Have to check for 'default' rather than empty string

});

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault(); // We dont want to submit this fake form

    const titleValue = inputForm[0].value;
    const authorValue = inputForm[1].value;
    const yearValue = inputForm[2].value;
    const pagesValue = inputForm[3].value;
    const hasReadValue = inputForm[4].checked ? 'Completed' : 'Reading';

    addBookToLibrary(titleValue, authorValue, yearValue , pagesValue, hasReadValue);

    dialog.close();
})


