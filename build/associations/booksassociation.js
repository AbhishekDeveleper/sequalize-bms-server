import { bookModel, authorModel, genreModel } from "../models/bmsModel.js";
genreModel.hasOne(bookModel, {
    foreignKey: "generId",
    as: "book",
});
bookModel.belongsTo(genreModel, {
    foreignKey: "generId",
    as: "category",
});
authorModel.hasMany(bookModel, {
    foreignKey: "authorId",
    as: "books",
});
bookModel.belongsTo(authorModel, {
    foreignKey: "authorId",
    as: "author",
});
export { bookModel, authorModel, genreModel };
