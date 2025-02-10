import express from "express";
import { addBook, deleteBookById, getBook, updateBookWithId } from "../controller/bmsController.js";
const router = express.Router();
console.log('runs before')
router.post("/books", addBook);
router.get("/books", getBook);
router.delete("/books/:id", deleteBookById)
router.patch('/books/:id',updateBookWithId)
export default router;