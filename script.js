const myLibrary = [];

// Book object constructor
function Book(title, author, year, pages, hasSeen) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.hasSeen = hasSeen;

}

// Add book to library function
function addBookToLibrary(bookTitle, bookAuthor, bookYear, bookPages, bookHasSeen) {
    let newBook = new Book(bookTitle, bookAuthor, bookYear, bookPages, bookHasSeen);
    myLibrary.push(newBook);
}

