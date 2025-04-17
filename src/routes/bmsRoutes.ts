import express from "express";
import { addBook, deleteBookById, fileProcessingWithStream, getBook, updateBookWithId } from "../controller/bmsController.js";
const router = express.Router();
router.post("/books", addBook);
router.get("/process", fileProcessingWithStream);
router.get("/books", getBook);
router.delete("/books/:id", deleteBookById)
router.patch('/books/:id',updateBookWithId)
export default router;