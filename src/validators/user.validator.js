import Joi from "joi";

//Validation for New User
export const createUserValidator = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    username:Joi.string().required(),
    email:Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/)
    .required(),
    password:Joi.string().regex((/^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{7,}$/))
    .required(),
}).strict()

//Validation for User Login
export const loginUserValidator = Joi.object({
    firstname:Joi.string().required(),
    lastname:Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
}).strict()