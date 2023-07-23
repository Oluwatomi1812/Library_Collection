import express from "express"
import UserControllers from "../controllers/user.controllers.js"
import LibraryController from "../controllers/library.controllers.js"
const router = express.Router()

router.post("/signup", UserControllers.createUser)
router.get("/find", UserControllers.findUser)
router.post("/login", UserControllers.userLogin)

router.post("/newBook", LibraryController.addBook)
router.get("/findBook", LibraryController.searchBook)

router.post("/borrow", LibraryController.createRental)
router.get("/getAll", LibraryController.getAllBorrowedBooks)
router.get("/getOne", LibraryController.getBorrowedBook)

export {router}