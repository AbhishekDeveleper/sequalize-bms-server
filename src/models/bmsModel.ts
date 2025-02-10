import { sequelize } from "../config/database.js";
import {  INTEGER, NUMBER, STRING } from 'sequelize';



export const authorModel = sequelize.define('authorTable', {
    authorName: {
        type: STRING,
        allowNull:false
    }
}, {
    freezeTableName:true
})

export const genreModel = sequelize.define('generTable', {

    generType: {
        type: STRING,
        allowNull: false,
        
    }
}, {
    freezeTableName: true,
    
})

export const bookModel = sequelize.define('bookTable', {

    bookTitle: {
        type: STRING,
        allowNull: false,
    },
    bookIsbn: {
        type: INTEGER,
        allowNull: false,
        unique:true
    },
    bookPublishDate: {
        type: STRING,
        allowNull:false,
    }, bookPrice: {
        type: INTEGER,
        allowNull:false,
    }, authorId: {
        type: INTEGER,
        allowNull:false,references: {
            model: 'authorTable',
            key:'id'
        }
    },
    generId: {
        type: INTEGER,
        allowNull: false,
        references: {
            model: 'generTable',
            key:'id'
        }
    }
}, {
    freezeTableName: true,
    
})
