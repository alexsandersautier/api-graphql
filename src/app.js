import { createTable, insertBook, updateBook, getBook, getBookById, deleteBook } from './controller/book.js'
import express from 'express' ;
const app = express();
app.use(express.json())

createTable();

app.get('/books', async (req, res) =>{
    let books = await getBook();

    res.json({
        "statusCode": 200,
        books
    });
});

app.get('/books/:id', async (req, res) =>{
    let books = await getBookById(req.params.id);

    res.json({
        "statusCode": 200,
        books
    });
});

app.post('/books', (req, res) =>{
    insertBook(req.body);
    res.json({
        "statusCode": 200
    });
});

app.put(`/books/:id`, (req, res) =>{
    updateBook(req.params.id, req.body);
    res.json({
        "statusCode": 200
    });
});

app.delete('/books/:id', (req, res) =>{
    try {
       deleteBook(req.params.id) 
       res.json({
        "statusCode": 200
       });
    } catch (error) {
        res.json({
            error
        });
    }
});

app.listen(3000, ()=>{
    console.log(`🔥 Server started...`)
});