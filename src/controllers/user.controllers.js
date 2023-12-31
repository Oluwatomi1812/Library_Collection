import User from "../models/user.model.js"
import {mongoIdValidator} from "../validators/mongoId.validator.js"
import { createUserValidator, loginUserValidator } from "../validators/user.validator.js"
import {UserRequestError, NotFoundError} from "../errors/error.js"
import { generateToken } from "../utils/jwt.utils.js"

export default class UserControllers{
    static async createUser(req, res, next){
      const { error, value } = createUserValidator.validate(req.body)
      if (error) throw error
      const emailExists = await User.find({ email: req.body.email })
      if (emailExists.length > 0) throw new UserRequestError("An account with this Email already exists.")
      const usernameExists = await User.find({ username: req.body.username })
      if (usernameExists.length > 0) throw new UserRequestError("An account with this Username already exists.")  
        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,   
        }
        try{
            const newUser = await User.create(user)
            res.status(200).json({
                status: "Successful",
                message: "New user created successfully",
                data: {
                    newUser,
                    access_token: generateToken(newUser)
                }
            })
        }
        catch(err){
            res.json(err.message)
            next(err)
        }       
    }
    
  static async findUser(req, res,) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if (error) throw new UserRequestError("Please pass in a valid mongoId")
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('User not found')
    //else
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        user
      }
    })
  }
    static async userLogin(req, res, next){
      const { error } = loginUserValidator.validate(req.body)
    if (error) throw error
    if (!req.body?.username && !req.body?.email) throw new UserRequestError("Please provide a username and email before you can login.")
      const user = await User.findOne({
      $or: [
        {
          email: req.body?.email,
        },{
          username: req.body?.username,
        }
      ]//finding using email or username
    })
    res.status(200).json({
        status: "Successful",
        message:"User successfully logged in",
        data: {
          user,
          access_token: generateToken(user)
      }
    })
  }
  static async listAllUsers(req, res, next){
    try{
      const users = await User.find().sort("firstname")
      if(users.length == 0){
        res.json({
          message:"No Users at this moment"
        })
      }
      res.status(200).json({
        status:"Successful!",
        message:"All users listed below",
        users
      })
    }
    catch(err){
      res.status(404).json(err.message)
      next(err)
    }
  }
  static async updateUser(req, res, next){
    try{
      const userId = req.query.userId
      const user = await User.findById(userId)
      if(!user){
        res.status(404).json({
          status:"Failed!",
          message:"User not found"
        })
      }
      await User.updateOne({_id: userId}, {$set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      }})
      res.status(200).json({
        status:"Successful!",
        message:"User Information has been updated",
        user
      })
    }
    catch(err){
      res.status(400).json(err.message)
      next(err)
    }
  }
  static async deleteUser(req, res, next){
    try{
      const userId = req.query.userId
      const user = await User.findById(userId)
      if(!user){
        res.status(404).json({
          status:"Failed!",
          message:"User not found"
        })
      }
      await User.deleteOne({_id:user.id})
      res.status(200).json({
        status:"Successful!",
        message:"User Account has been deleted"
      })
    }
    catch(err){
      res.status(400).json(err.message)
      next(err)
    }
  }
}
