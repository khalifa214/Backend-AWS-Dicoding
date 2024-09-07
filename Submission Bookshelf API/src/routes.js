const { addBook, getAllBooks, getDetailBook, editBook, deleteBook } = require("./handler");

const routes = [
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getDetailBook
    },
    {
        method: "POST",
        path: "/books",
        handler: addBook
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editBook
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook
    }
];

module.exports = routes;