import { newBookRepo } from "./bmsRepository.js";
class BMSService {
    bms;
    constructor(bms) {
        this.bms = bms;
    }
    async deleteBookById(id) {
        await this.bms.deleteBookById(id);
    }
    async addBook(Book) {
        await this.bms.addBook(Book);
    }
    async updateBookWithId(id, bookData) {
        await this.bms.updateBookWithId(id, bookData);
    }
    async getBook() {
        const bookData = await this.bms.getBook();
        if (bookData)
            return bookData;
        else
            return null;
    }
    async deleteBook() { }
}
export const newBookService = new BMSService(newBookRepo);
