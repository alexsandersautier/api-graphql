import { openDb } from "../configDb.js";

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Book ( id INTEGER PRIMARY KEY, title TEXT, release DATE)');
    })
}

export async function insertBook(book){
    openDb().then(db=>{
        db.run('INSERT INTO Book (title, release) VALUES (?, ?)', [book.title, book.release]);
    })
}

export async function updateBook(id, book){
    openDb()
        .then(db=>{
            db.run('UPDATE Book SET title=?, release=? WHERE id=?', [book.title, book.release, id]);
        });
}

export async function getBook(){
    return openDb()
        .then(db=>{
            return db.all('SELECT * FROM Book')
                .then(res=>res);
        });
}

export async function getBookById(id){
    return openDb()
        .then(db=>{
            return db.get('SELECT * FROM Book WHERE id=?', id)
                .then(res=>res);
        });
}

export async function deleteBook(id){
    openDb().
        then(db=>{
            db.run('DELETE FROM Book WHERE id=?', [id]);
        });
}