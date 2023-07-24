import Rental from "../models/rental.model.js"
import  User from "../models/user.model.js"
import Book from "../models/library.model.js"
export default class RentalControllers{
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
            await rental.populate("User", { name:1 })
            await rental.populate("Book", {title: 1})
            
            res.status(200).json(rental)

        } catch (err) {
            res. json(err.message)
            next(err)
        }
    }
        
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

// UPDATE a rental using PUT method
// routes: /api/v1/rentals
    static async updateRental (req, res, next) {
        try {
            const rentalId = req.query.rentalId
            const rental = await Rental.findById(rentalId)
            if (!rental) {
                return res.status(404).json({
                    message: "No rental found"
                })
            }
            const rentol ={ 
                bookId: req.body.bookId,
                userId: req.body.userId,
                dateOut: req.body.dateOut,
                dateReturned: req.body.dateReturned
    
            }

            if (!rentol.bookId || !rentol.dateReturned || !rentol.userId) {
                return res.status(404).json({
                    message: "All fields are mandatory"
                })
            }
            await Rental.updateOne({_id: rental.id})
            res.status(200).json({
                message: "Rental updated successfully",
                rental
            })

        } catch (err) {
            res.status.json(err.message)
            next(err)
        }
    }

    static async deleteRental (req, res, next) {
        try {
            const rental = await Rental.find({_id:req.params.id})
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