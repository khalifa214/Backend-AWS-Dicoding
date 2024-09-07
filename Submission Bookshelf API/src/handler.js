const books = require("./books");
const { nanoid } = require("nanoid");

//fungsi untuk menambahkan buku
const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = `${Date.now()}-${nanoid(10)}`;
    let insertedAt = new Date().toISOString();
    let updatedAt = insertedAt;
    let finished = pageCount === readPage;


    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    if (!name) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }

    books.push(newBook);

    const isSuccess = books.filter(book => book.id === id).length > 0;

    if (isSuccess) {
        return h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                "bookId": id
            }
        }).code(201);
    }

    return h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Silahkan coba lagi"
    }).code(400);
};

//funsi untuk mengambil data buku
const getAllBooks = (request, h) => {
    let { name, reading, finished } = request.query;

    if (name !== undefined) {
        const tempBooks = books;
        const filterBookByName = tempBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));

        if (filterBookByName.length > 0) {
            return {
                status: "success",
                data: {
                    books: 
                        filterBookByName.map(book => {
                            return {
                                id: book.id,
                                name: book.name,
                                publisher: book.publisher
                            }
                        })
                }
            };
        } 

        return {
            status: "success",
            data: {
                books: [],
            }
        };
        
    }

    if (reading !== undefined) {
        let status = (reading == 0 ? false : true);

        const tempBooks = books;
        const filterBookByReading = tempBooks.filter(book => book.reading === status);

        if (filterBookByReading.length > 0) {
            return {
                status: "success",
                data: {
                    books: 
                        filterBookByReading.map(book => {
                            return {
                                id: book.id,
                                name: book.name,
                                publisher: book.publisher
                            }
                        })
                }
            };
        } 

        return {
            status: "success",
            data: {
                books: [],
            }
        };
    }

    if (finished !== undefined) {
        let status = (finished == 0 ? false : true);

        const tempBooks = books;
        const filterBookByFinished = tempBooks.filter(book => book.finished === status);

        if (filterBookByFinished.length > 0) {
            return {
                status: "success",
                data: {
                    books: 
                        filterBookByFinished.map(book => {
                            return {
                                id: book.id,
                                name: book.name,
                                publisher: book.publisher
                            }
                        })
                }
            };
        } 

        return {
            status: "success",
            data: {
                books: [],
            }
        };
    }
    
    
   return {
        status: "success",
        data: {
            books: 
                books.map(book => {
                    return {
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher
                    }
                })
            
        }
    };
};

//fungsi untuk mendapatkan detail buku
const getDetailBook = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter(book => book.id === bookId)[0];
    
    if (book !== undefined) {
       const response = h.response({
            status: "success",
            data: {
                book: book
            }
        })
        .code(200);

        return response;
    }
    
   const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
    })
    .code(404);

    return response;
};

//fungsi untuk edit buku
const editBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload; 

    let updatedAt = new Date().toISOString();
    let finished = pageCount === readPage;
    const { bookId } = request.params;
    const index = books.findIndex(book => book.id === bookId);

    if (!name) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt, finished
        };

        return h.response({
            status: "success",
            message: "Buku berhasil diperbarui"
        });
    }

    return h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan"
    }).code(404);

};

const deleteBook = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
       books.splice(index, 1);

       return h.response({
        status : "success",
        message: "Buku berhasil dihapus"
       }).code(200);
    }

    return h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    }).code(404);
};

module.exports = { 
    addBook, getAllBooks, getDetailBook, editBook, deleteBook
};