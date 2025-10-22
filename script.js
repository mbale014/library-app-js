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

myLibrary.forEach(book => {
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