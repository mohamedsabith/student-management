import express from 'express';
import { studentAdd } from '../controllers/studentController.js';
import studentValidationSchema from '../validators/studentValidator.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import verifyUser from '../middlewares/verifyUser.js';

const router = express.Router();

router.post(
    '/studentAdd',
    validationMiddleware(studentValidationSchema.studentAddSchema, 'body'),
    verifyUser,
    studentAdd
);

export default router;
