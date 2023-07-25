import Rental from "../models/rental.model.js"
import  User from "../models/user.model.js"
import Book from "../models/library.model.js"
export default class RentalControllers{
//ROUTE
 //localhost/library/newRental?bookId=...&userId=...
    static async createRentals (req, res, next) {
        try {
            const bookId = req.query.bookId
            const book = await Book.findById(bookId)
            if (book.numberInStock === 0) return res.status(404).json({
                message: "This movie is out of stock"
            }) 
            const userId = req.query.userId
            const user = await User.findById(userId) 
            if (!user) {
                return res.status(404).json({
                    message: "This user doesn't exists"
                })
            }

            const {dateOut, dateReturned } = req.body 
            if (!dateReturned) return res.status(404).json({
                message: "All fields are mandatory"
            })
            

            const rental = await Rental.create({ dateOut, dateReturned})
            await Book.updateOne({_id: book.id},{$inc: {numberInStock:-1}})
           
            res.status(200).json({
                rental,
                userData:{
                    username: user.username,
                    title: book.title
            }
        })

        } catch (err) {
            res. json(err.message)
            next(err)
        }
    }
//ROUTE
//localhost/library/findRental?rentalId=...
    static async getRental (req, res, next) {
        try {
            const rentalId = req.query.rentalId
            const rental = await Rental.findById(rentalId)
            if (!rental) return res.status(404).json({
                message: "No Rental found in record"
            })

            await rental.populate("User", {name: 1})
            await rental.populate("Book", {title: 1})
            res.status(200).json({
                status: "Successful!",
                message:"Rental is available",
                rental
            })

        } catch (err) {
            res.json(err.message)
            next(err)
        }
    }
    //ROUTE
    //localhost/library/getAll
    static async getAllRentals (req, res, next) {
        try {
            const rentals = await Rental.find().sort("dateOut")
            if (rentals.length === 0) return res.status(404).json({
                message: "There are no rentals at this moment"
            })

            
            res.status(200).json({
                message: "List of all Rentals",
                rentals
            })
        } 
        catch (err) {
            res.json(err.message)
            next(err)
        }
    }
//ROUTE
//localhost/library/updateRental?rentalId=...
    static async updateRental (req, res, next) {
        try {
            const rentalId = req.query.rentalId
            const rental = await Rental.findById(rentalId)
            if (!rental) {
                return res.status(404).json({
                    message: "No rental found"
                })
            }
            const update ={ 
                bookId: req.body.bookId,
                userId: req.body.userId,
                dateOut: req.body.dateOut,
                dateReturned: req.body.dateReturned
            }

            if (!update.bookId || !update.dateReturned || !update.userId) {
                return res.status(404).json({
                    message: "All fields are mandatory"
                })
            }
            await Rental.updateOne({_id: rental.id}, {dateOut :update.dateOut}, {dateReturned :update.dateReturned})
            const userId = update.userId
            const user = await User.findById(userId)
            
            const bookId = update.bookId
            const book = await Book.findById(bookId)
            res.status(200).json({
                message: "Rental updated successfully",
                rental,
                userData:{
                    username: user.username,
                    title: book.title
            }
        })

        } catch (err) {
            res.status(404).json(err.message)
            next(err)
        }
    }
//ROUTE
//localhost/library/deleteRental?rentalId=...
    static async deleteRental (req, res, next) {
        try {
            const rentalId = req.query.rentalId
            const rental = await Rental.findById(rentalId)
           if (!rental) return res.status(404).json({
                message: "Rental data not found"
            })

            await Rental.deleteOne({_id:rental.id})
            res.status(200).json({
                message: "Rental deleted successfully"
            })
        } catch (err) {
            res.json(err.message)
            next(err)
        }
    }
}