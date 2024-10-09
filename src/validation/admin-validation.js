import Joi from "joi";

const loginAdminValidation = Joi.object({
    username: Joi.string().alphanum().max(100).min(3).required(),
    password: Joi.string().alphanum().max(100).min(3).required()
});

const logoutAdminValidation = Joi.string().max(100).min(3).required();

const addProductValidation = Joi.object({
    name: Joi.string().max(100).min(3).required(),
    description: Joi.string(),
    price: Joi.string().required()
});

const updateProductValidation = Joi.object({
    name: Joi.string().max(100).min(3),
    description: Joi.string(),
    price: Joi.string()
});

const confirmPaymentValidation = Joi.object({
    paymentStatus: Joi.string().allow('Waiting Payment', 'Payment Verified').required(),
    shipment_status: Joi.string().allow('Verification Process', 'On Shipment'),
})

export {
    loginAdminValidation,
    logoutAdminValidation,
    addProductValidation,
    updateProductValidation,
    confirmPaymentValidation
}