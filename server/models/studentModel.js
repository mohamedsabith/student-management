import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
    {
        StudentName: {
            FirstName: {
                type: String,
                required: true,
            },
            LastName: {
                type: String,
                required: true,
            },
        },
        Gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female'],
        },
        DateOfBirth: {
            type: String,
            required: true,
        },
        DateOfAdmission: {
            type: String,
            required: true,
        },
        Category: {
            type: String,
            required: true,
            enum: ['General', 'OBC', 'SC', 'ST', 'Others'],
        },
        Religion: {
            type: String,
            required: true,
            enum: ['Muslim', 'Hindu', 'Sikh', 'Christian', 'Jain', 'Others'],
        },
        FathersName: {
            type: String,
            required: true,
        },
        MothersName: {
            type: String,
            required: true,
        },
        FathersOccupation: {
            type: String,
            required: true,
        },
        MothersOccupation: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        Address: {
            Address: {
                type: String,
                required: true,
            },
            City: {
                type: String,
                required: true,
            },
            State: {
                type: String,
                required: true,
            },
            PostalCode: {
                type: String,
                required: true,
            },
            Country: {
                type: String,
                required: true,
            },
        },
    },
    { timestamps: true }
);

const studentModel = mongoose.model('Student', studentSchema);

export default studentModel;
