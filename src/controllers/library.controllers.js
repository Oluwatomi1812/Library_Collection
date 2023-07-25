import Book from "../models/library.model.js"
import Rental from "../models/rental.model.js"

export default class LibraryController{
    static async addBook(req, res, next){
        const book = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            numberInStock: req.body.numberInStock
        }
        try{
            const newBook = await Book.create(book)
            res.status(200).json({
                status: "Successful",
                message:"New Book has been added",
                data: newBook
            })
        }
        catch(err){
            res.json(err.mesage)
            next(err)
        }
    }
    
static async searchBook(req, res, next) {
    try {
      const { title, author, isbn } = req.body;
      const query = {};
  
      if (title) query.title = title;
      if (author) query.author = author;
      if (isbn) query.isbn = isbn;
  
      const book = await Book.findOne(query);
  
      if (!book) {
        return res.status(404).json({
          status: "Failed",
          message: "Book not available",
        });
      }
  
      res.status(200).json({
        status: "Successful",
        message: "Book is available",
        data: book,
      });
    } catch (err) {
      // Handle any errors that occurred during the search
      next(err);
    }
  }
  static async updateBook(req, res, next){
    try{
      const bookId = req.query.bookId
      const book = await Book.findById(bookId)
      if(!book){
        res.status(404).json({
          status:"Failed!",
          message:"Book not found"
        })
      }
      await Book.updateOne({_id: bookId}, {$set: {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        numberInStock: req.body.numberInStock,
      }})
      res.status(200).json({
        status:"Successful!",
        message:"Book Information has been updated",
        book
      })
    }
    catch(err){
      res.status(400).json(err.mesage)
      next(err)
    }
  }
  static async deleteBook(req, res, next){
    try{
      const bookId = req.query.bookId
      const book = await Book.findById(bookId)
      if(!book){
        res.status(404).json({
          status:"Failed!",
          message:"Book not found"
        })
      }
      await Book.deleteOne({_id:book.id})
      res.status(200).json({
        status:"Successful!",
        message:"Book has been deleted"
      })
    }
    catch(err){
      res.status(400).json(err.message)
      next(err)
    }
  }
}