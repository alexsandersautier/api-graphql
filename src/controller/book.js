import { openDb } from "../configDb.js";

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Book ( id INTEGER PRIMARY KEY, title TEXT, release DATE)');
    })
}

export async function insertBook(req, res){
    let book = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Book (title, release) VALUES (?, ?)', [book.title, book.release])
            .then(()=>res.json({"statusCode": 200}));
    });
}

export async function getBook(req, res){
    openDb()
        .then(db=>{
            db.all('SELECT * FROM Book')
                .then(books=>res.json(books));
        });
}

export async function getBookById(req, res){
    openDb()
        .then(db=>{
            db.get('SELECT * FROM Book WHERE id=?', req.params.id)
                .then(book=>res.json(book));
        });
}

export async function updateBook(req, res){
    let book = req.body;
    openDb()
        .then(db=>{
            db.run('UPDATE Book SET title=?, release=? WHERE id=?', [book.title, book.release, req.params.id])
            .then(()=>res.json({"statusCode": 200}));
        });
}

export async function deleteBook(req, res){
    openDb().
        then(db=>{
            db.run('DELETE FROM Book WHERE id=?', [req.params.id])
            .then(()=>res.json({"statusCode": 200}));
        });
}