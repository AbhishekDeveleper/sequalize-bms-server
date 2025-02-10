import {
  BaseBook,
  BookBody,
  BookBodyOptional,
  BookReturnType,
} from "../types&interface/bmsTypes.js";
import { newBookRepo } from "./bmsRepository.js";

class BMSService {
  constructor(private bms: BaseBook) {}

  async deleteBookById(id: number): Promise<void> {
    await this.bms.deleteBookById(id);
  }

  async addBook(Book: BookBody): Promise<void> {
    await this.bms.addBook(Book);
  }

  async updateBookWithId(
    id: number,
    bookData: BookBodyOptional
  ): Promise<void> {
    await this.bms.updateBookWithId(id, bookData);
  }

  async getBook(): Promise<BookReturnType[] | null> {
    const bookData = await this.bms.getBook();
    if (bookData) return bookData;
    else return null;
  }

  async deleteBook() {}
}

export const newBookService = new BMSService(newBookRepo);
