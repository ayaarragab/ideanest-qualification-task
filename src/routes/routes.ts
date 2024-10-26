import { Router } from 'express';
import { signin, signup, refreshTokenrequest } from '../controllers/authController'
import { validateInputSignup, validateInputSignin, validateRefreshToken } from '../middlewares/validateInputs';
import { handleValidationErrors } from '../middlewares/validationErrorsHandle';
import { emailExists } from '../middlewares/validationErrorsHandle';

export const router = Router();


router.post('/signup', validateInputSignup, handleValidationErrors, emailExists, signup);
router.post('/signin', validateInputSignin, handleValidationErrors, signin);
router.post('/refresh-token', validateRefreshToken, handleValidationErrors, refreshTokenrequest)
