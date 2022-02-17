const Joi = require("joi");

const validateProprietor = (data) => {
    // Schema for proprietor register request object.
    const proprietorSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^proprietor$")),
        userID: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
    });

    return proprietorSchema.validate(data);
};

const validateRegisterFirm = (data) => {
    // Schema for firm register request object.
    const firmSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^firm$")),
        corporateID: Joi.string().alphanum().min(3).max(30).required(),
        userID: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
        isAdmin: Joi.boolean().required(),
    });

    return firmSchema.validate(data);
};

const validateLoginFirm = (data) => {
    // Schema for firm login request object.
    const firmSchema = Joi.object({
        userType: Joi.string().pattern(new RegExp("^firm$")),
        corporateID: Joi.string().alphanum().min(3).max(30).required(),
        userID: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{0,30}$")),
    });

    return firmSchema.validate(data);
};

module.exports.validateProprietor = validateProprietor;
module.exports.validateRegisterFirm = validateRegisterFirm;
module.exports.validateLoginFirm = validateLoginFirm;
