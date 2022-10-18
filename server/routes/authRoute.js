import express from 'express';
import {
    signUp,
    signIn,
    ForgotPassword,
    ResetPassword,
} from '../controllers/authController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import authValidationSchema from '../validators/authValidator.js';

const router = express.Router();

router.post(
    '/signup',
    validationMiddleware(authValidationSchema.signUpSchema, 'body'),
    signUp
);
router.post(
    '/signin',
    validationMiddleware(authValidationSchema.signInSchema, 'body'),
    signIn
);

router.post(
    '/forgotPassword',
    validationMiddleware(authValidationSchema.forgotPassowrdSchema),
    ForgotPassword
);
router.post(
    '/resetPassword',
    validationMiddleware(authValidationSchema.resetPasswordSchema),
    ResetPassword
);

export default router;
