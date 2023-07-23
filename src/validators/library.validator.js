import Joi from "joi";

//New Book Validator
export const addBookValidator = Joi.object({
    title:Joi.string().required(),
    author:Joi.string().required(),
    isbn:Joi.string().required(),
    numberInStock: Joi.number().required(),
}).strict()
