import Joi from 'joi';

const authValidationSchema = {
    signUpSchema: Joi.object({
        email: Joi.string().email().required().label('Email'),
        number: Joi.number().required().label('Phone Number'),
        password: Joi.string().required().min(8).max(20).label('Password'),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .label('Confirm Password')
            .messages({ 'any.only': '{{#label}} does not match' }),
    }),

    signInSchema: Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().min(8).max(200).label('Password'),
        userIp: Joi.string(),
    }),
    forgotPassowrdSchema: Joi.object({
        email: Joi.string().email().required().label('Email'),
    }),
    resetPasswordSchema: Joi.object({
        password: Joi.string().required().min(8).max(20).label('Password'),
        confirmPassword: Joi.any()
            .equal(Joi.ref('password'))
            .required()
            .label('Confirm password')
            .messages({ 'any.only': '{{#label}} does not match' }),
    }),
};

export default authValidationSchema;
