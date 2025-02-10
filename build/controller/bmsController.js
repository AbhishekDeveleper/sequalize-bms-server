import { newBookService } from "./bmsService.js";
export const addBook = async (req, res) => {
    const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice, } = req.body;
    const bookBody = {
        authorName,
        generType,
        bookTitle,
        bookIsbn,
        bookPublishDate,
        bookPrice,
    };
    await newBookService.addBook(bookBody);
    res.status(200).json({
        status: "success",
        message: "newBook added Successfully.",
        data: bookBody,
    });
};
export const getBook = async (req, res) => {
    const booksData = await newBookService.getBook();
    if (booksData) {
        res.status(200).json({
            status: "success",
            data: booksData,
        });
    }
    else {
        res.status(400).json({
            error: "something went wrong",
        });
    }
};
export const deleteBookById = async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    console.log(bookId, id);
    await newBookService.deleteBookById(bookId);
    res.status(200).json({
        status: "success",
        message: "Book deleted successfully.",
    });
};
export const updateBookWithId = async (req, res) => {
    const { id } = req.params;
    const bookId = Number(id);
    const { authorName, generType, bookTitle, bookIsbn, bookPublishDate, bookPrice, } = req.body;
    const bookBody = {
        authorName,
        generType,
        bookTitle,
        bookIsbn,
        bookPublishDate,
        bookPrice,
    };
    await newBookService.updateBookWithId(bookId, bookBody);
    res.status(200).json({
        status: "success",
        message: "updated successfully",
    });
};
