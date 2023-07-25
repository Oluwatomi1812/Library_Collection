import express from "express"
import UserControllers from "../controllers/user.controllers.js"
import LibraryController from "../controllers/library.controllers.js"
import RentalControllers from "../controllers/rental.controllers.js"
const router = express.Router()

router.post("/signup", UserControllers.createUser)
router.get("/findUser", UserControllers.findUser)
router.post("/login", UserControllers.userLogin)
router.get("/findAll", UserControllers.listAllUsers)
router.put("/updateUser", UserControllers.updateUser)
router.delete("/deleteUser", UserControllers.deleteUser)

router.post("/newBook", LibraryController.addBook)
router.get("/findBook", LibraryController.searchBook)
router.put("/updateBook", LibraryController.updateBook)
router.delete("/deleteBook", LibraryController.deleteBook)

router.post("/newRental", RentalControllers.createRentals)
router.get("/findRental", RentalControllers.getRental)
router.get("/getAll", RentalControllers.getAllRentals)
router.put("/updateRental", RentalControllers.updateRental)
router.delete("/deleteRental", RentalControllers.deleteRental)

export {router}