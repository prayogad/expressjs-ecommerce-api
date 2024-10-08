import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(100).min(3).required(),
    phone: Joi.string().required(),
    address: Joi.string().max(255)
});

const loginUserValidation= Joi.object({
    username: Joi.string().max(100).min(3).required(),
    password: Joi.string().max(100).min(3).required(),
})

const editUserValidation = Joi.object({
    username: Joi.string().alphanum().max(100).min(3),
    email: Joi.string().email(),
    password: Joi.string().max(100).min(3),
    phone: Joi.string(),
    address: Joi.string().max(255)
});

const paymentValidation = Joi.object({
    expedition: Joi.string().allow('JNE', 'JNT', 'Sicepat', 'Tiki').required()
});

const updateCartValidation = Joi.object({
    product_id: Joi.number().positive().required(),
    quantity: Joi.number().positive().required()
});

export {
    registerUserValidation,
    editUserValidation,
    loginUserValidation,
    paymentValidation,
    updateCartValidation
}