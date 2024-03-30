import Joi from "joi"

const createProductValidation = Joi.object({
    name: Joi.string().required().max(50),
    price: Joi.number().required().min(0),
    description: Joi.string().optional().allow('').max(255),
    quantity: Joi.number().required().min(1)
})

const updateProductValidation = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required().max(50),
    price: Joi.number().required().min(0),
    description: Joi.string().optional().allow('').max(255),
    quantity: Joi.number().required().min(1)
})

export {
    createProductValidation,
    updateProductValidation
}