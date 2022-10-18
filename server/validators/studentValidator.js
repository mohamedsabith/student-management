import Joi from "joi";

const studentValidationSchema = {
    studentAddSchema:  Joi.object({
        firstName: Joi.string().required().label('First Name').max(255),
        lastName: Joi.string().required().label('Last Name').max(255),
        gender: Joi.string().required().label('Gender').max(255),
        category: Joi.string().required().label('Category').max(255),
        religion: Joi.string().required().label('Religion').max(255),
        dob: Joi.date().raw().required().label("Date Uf Birth"),
        fatherName: Joi.string().required().label('Father Name').max(255),
        motherName: Joi.string().required().label('Mother Name').max(255),
        fatherOccupation: Joi.string().required().label('Father Occupation').max(255),
        motherOccupation: Joi.string().required().label('Mother Occupation').max(255),
        email: Joi.string().email().required().label('Email').lowercase(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required().label("Phone Number"),
        address: Joi.string().required().label("Address").max(255),
        city: Joi.string().required().label("City").max(255),
        pincode: Joi.string().length(6).pattern(/^[0-9]+$/).required().label("Pincode"),
        state: Joi.string().required().label("State").max(255),
        country: Joi.string().required().label('Country').max(255),
    }),
}

export default studentValidationSchema