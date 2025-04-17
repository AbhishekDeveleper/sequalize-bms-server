import EventEmitter from "events";

class BookEvents extends EventEmitter {
  constructor() {
    super();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.on("book_created", (book) => {
      console.log(
        `New book : ${book.bookTitle} added by ${book.authorName} of ${book.bookPrice}$ `
      );
    });

    // Error handlers
    this.on("error", (error) => {
      console.error("Book system error:", error);
    });
  }
}

export default BookEvents;
