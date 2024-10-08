import Joi from "joi";

const searchProductValidation = Joi.object({
    name: Joi.string().required()
});

export {
    searchProductValidation
}