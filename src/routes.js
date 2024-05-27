import { Router } from "express";
import { createTable, insertBook, updateBook, getBook, getBookById, deleteBook } from './controller/book.js'

const router = Router();

createTable()

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "🔥 Server started..."
    })
})

router.post('/books', insertBook)
router.get('/books', getBook);
router.get('/books/:id', getBookById);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

export default router;