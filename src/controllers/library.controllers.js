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
  static async getAllBorrowedBooks(req, res, next){
    try{
        const borrowedBook = await Rental.find().sort("dateout")
        if(borrowedBook == 0){
            res.status(404).json({
                message: "No books have been borrowed"
            })
        }
        res.status(200).json({
            status: "Successful!",
            message: "List of Boroowed books available",
            data :{borrowedBook}
        })
    }
    catch(err){
        res.send(err.message)
        next(err)
    }
  }
  static async getBorrowedBook(req, res, next){
    try{
        const borrowedBook = await Rental.findOne({_id: req.params.id})
        if(!borrowedBook){
            res.status(404).json({
                message: "No books found"
            })
        }
        await borrowedBook.populate("Customer", {username: 1})
        await borrowedBook.populate("Book", {title: 1})
        res.status(200).json({
            status: "Successful!",
            message: "Borrowed books available",
            data :{borrowedBook}
        })
    }
    catch(err){
        res.send(err.message)
        next(err)
    }
  }
  static async createRental(req, res, next){
    try{
        const id = req.query
        const book = await Book.findById(id.id)
        if(book.numberInStock === 0){
            res.status(404).json({
                message: "This book is out of stock"
            })
        }
        
        const rentedBook= {
            book,
            dateOut: req.body.dateOut,
            dateReturned: req.body.dateReturned 
        }
       
        const rental = await Rental.create(rentedBook)
        await rental.updateOne({$inc:{numberInStock:-1}})
        res.status(200).json({
            status:"Successful!",
            message: "Book is in stock",
            rental,
            rentedBook
        })
        
    }
    catch(err){
        res.send(err.message)
        next(err)
    }
  }
}