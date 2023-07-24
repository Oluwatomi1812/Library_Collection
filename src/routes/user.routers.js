import express from "express"
import UserControllers from "../controllers/user.controllers.js"
import LibraryController from "../controllers/library.controllers.js"
import RentalControllers from "../controllers/rental.controllers.js"
const router = express.Router()

router.post("/signup", UserControllers.createUser)
router.get("/find", UserControllers.findUser)
router.post("/login", UserControllers.userLogin)

router.post("/newBook", LibraryController.addBook)
router.get("/findBook", LibraryController.searchBook)

router.post("/newRental", RentalControllers.createRentals)
router.get("/findRental", RentalControllers.getRental)
router.get("/getAll", RentalControllers.getAllRentals)
router.put("/updateRental", RentalControllers.updateRental)
router.delete("/deleteRental", RentalControllers.deleteRental)

export {router}