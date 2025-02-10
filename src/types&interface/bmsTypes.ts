export type BookReturnType = Omit<
  BooksAttribute,
  "id" | "createdAt" | "updatedAt"
>;
export interface BookBody {
  authorName: string;
  generType: string;
  bookTitle: string;
  bookIsbn: number;
  bookPublishDate: string;
  bookPrice: number;
}

export type BookBodyOptional = Partial<BookBody>;
export interface BooksAttribute {
  id: number;
  bookTitle: string;
  bookIsbn: number;
  bookPublishDate: string;
  bookPrice: number;
  authorId: number;
  generId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BooksCreationAttribute {
  bookTitle: string;
  bookIsbn: number;
  bookPublishDate: string;
  bookPrice: number;
  authorId: number;
  generId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthorAttributes {
  id?: number;
  authorName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GenerAttributes {
  id?: number;
  generType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseBook {
  addBook(Book: {
    authorName: string;
    generType: string;
    bookTitle: string;
    bookIsbn: number;
    bookPublishDate: string;
    bookPrice: number;
  }): Promise<void>;
  deleteBook(id: number): Promise<void>;
  updateBookWithId(id: number, bookData: BookBodyOptional): Promise<void>;
  deleteBookById(id: number): Promise<void>;
  getBook(): Promise<BookReturnType[] | null>;
}

export interface BookService {
  addBook(Book: BookBody): void;
  deleteBookById(): void;
  updateBook(): void;
  getBook(): Promise<BookReturnType[] | null>;
}

export interface BookController {
  addBook(): void;
  deleteBookById(): void;
  getBook(): void;
}

export interface RepositoryInterface {}
