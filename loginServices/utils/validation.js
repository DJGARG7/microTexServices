const Joi = require("joi");

const validateRegisterProprietor = (data) => {
    // Schema for proprietor register request object.
    const proprietorSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^proprietor$")),
        userID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[ a-zA-Z]*$"))
            .required(),
        userName: Joi.string()
            .min(2)
            .max(30)
            .pattern(new RegExp("^[ a-zA-Z]*$"))
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp("^[a-zA-Z0-9]*$"))
            .required(),
    });

    return proprietorSchema.validate(data);
};

const validateLoginProprietor = (data) => {
    // Schema for proprietor register request object.
    const proprietorSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^proprietor$")),
        userID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[_a-zA-Z0-9]*$"))
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp("^[a-zA-Z0-9]*$"))
            .required(),
    });

    return proprietorSchema.validate(data);
};

const validateRegisterFirm = (data) => {
    // Schema for firm register request object.
    const firmSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^firm$")),
        corporateID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[_a-zA-Z0-9]*$"))
            .required(),
        userID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[_a-zA-Z0-9]*$"))
            .required(),
        userName: Joi.string()
            .min(2)
            .max(30)
            .pattern(new RegExp("^[ a-zA-Z]*$"))
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp("^[a-zA-Z0-9]*$"))
            .required(),
        isAdmin: Joi.boolean().required(),
    });

    return firmSchema.validate(data);
};

const validateLoginFirm = (data) => {
    // Schema for firm login request object.
    const firmSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^firm$")),
        corporateID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[_a-zA-Z0-9]*$"))
            .required(),
        userID: Joi.string()
            .min(3)
            .max(30)
            .pattern(new RegExp("^[_a-zA-Z0-9]*$"))
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp("^[a-zA-Z0-9]*$"))
            .required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{0,30}$")),
    });

    return firmSchema.validate(data);
};

module.exports.validateRegisterProprietor = validateRegisterProprietor;
module.exports.validateLoginProprietor = validateLoginProprietor;
module.exports.validateRegisterFirm = validateRegisterFirm;
module.exports.validateLoginFirm = validateLoginFirm;
