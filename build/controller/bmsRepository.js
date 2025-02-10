import { authorModel, bookModel, genreModel } from "../models/bmsModel.js";
class BMSRepository {
    async getBook() {
        try {
            const booksData = await bookModel.findAll({
                include: {
                    model: genreModel,
                    as: "category",
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                },
                attributes: { exclude: ["id", "createdAt", "updatedAt"] },
            });
            return booksData;
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err?.message || "Something went wrong in fetching book details !");
            }
            throw new Error("Something went Wrong !");
        }
    }
    async addBook(Book) {
        try {
            const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice, } = Book;
            const bookCategory = await genreModel.create({ generType });
            const bookAuthor = await authorModel.create({ authorName });
            let newBook;
            if (bookAuthor && bookCategory) {
                newBook = await bookModel.create({
                    bookTitle,
                    bookIsbn,
                    bookPublishDate,
                    bookPrice,
                    authorId: bookAuthor.id,
                    generId: bookCategory.id,
                });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err?.message || "Something went wrong iwhile inserting newBook !");
            }
            throw new Error("Something went Wrong in addingBook  !");
        }
    }
    async deleteBookById(id) {
        try {
            await bookModel.destroy({ where: { bookIsbn: id } });
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err?.message || "Something went wrong in deleting book from library !");
            }
            throw new Error("Something went wrong while deleting book!");
        }
    }
    async updateBookWithId(id, bookData) {
        try {
            const book = await bookModel.findOne({ where: { bookIsbn: id } });
            console.log(book);
            if (book) {
                book.authorName = bookData.authorName || book.authorName;
                book.bookIsbn = bookData.bookIsbn || book.bookIsbn;
                book.bookPrice = bookData.bookPrice || book.bookPrice;
                book.bookTitle = bookData.bookTitle || book.bookTitle;
                book.bookPublishDate = bookData.bookPublishDate || book.bookPublishDate;
                await book.save();
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new Error(err?.message || "Something went wrong in updating  book details !");
            }
            throw new Error("Something went wrong while updating book!");
        }
    }
    async deleteBook() { }
}
export const newBookRepo = new BMSRepository();
