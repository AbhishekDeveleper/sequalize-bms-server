import { authorModel, bookModel, genreModel } from "../models/bmsModel.js";
import {
  BaseBook,
  BookBody,
  BookBodyOptional,
  BookReturnType,
  BooksCreationAttribute,
} from "../types&interface/bmsTypes.js";

class BMSRepository implements BaseBook {
  async getBook(): Promise<BookReturnType[] | null> {
    try {
      const booksData: BooksCreationAttribute[] | unknown =
        await bookModel.findAll({
          include: {
            model: genreModel,
            as: "category",
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        });

      return booksData as BookReturnType[];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          err?.message || "Something went wrong in fetching book details !"
        );
      }
      throw new Error("Something went Wrong !");
    }
  }

  async addBook(Book: BookBody): Promise<void> {
    try {
      const {
        authorName,
        generType,
        bookTitle,
        bookIsbn,
        bookPublishDate,
        bookPrice,
      } = Book;

      const bookCategory: any = await genreModel.create({ generType });
      const bookAuthor: any = await authorModel.create({ authorName });
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
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          err?.message || "Something went wrong iwhile inserting newBook !"
        );
      }
      throw new Error("Something went Wrong in addingBook  !");
    }
  }

  async deleteBookById(id: number): Promise<void> {
    try {
      await bookModel.destroy({ where: { bookIsbn: id } });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          err?.message || "Something went wrong in deleting book from library !"
        );
      }
      throw new Error("Something went wrong while deleting book!");
    }
  }
  async updateBookWithId(
    id: number,
    bookData: BookBodyOptional
  ): Promise<void> {
    try {
      const book: any = await bookModel.findOne({ where: { bookIsbn: id } });
      console.log(book);
      if (book) {
        book.authorName = bookData.authorName || book.authorName;
        book.bookIsbn = bookData.bookIsbn || book.bookIsbn;
        book.bookPrice = bookData.bookPrice || book.bookPrice;
        book.bookTitle = bookData.bookTitle || book.bookTitle;
        book.bookPublishDate = bookData.bookPublishDate || book.bookPublishDate;
        await book.save();
      }
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(
          err?.message || "Something went wrong in updating  book details !"
        );
      }
      throw new Error("Something went wrong while updating book!");
    }
  }

  async deleteBook(): Promise<void> {}
}

export const newBookRepo = new BMSRepository();
