import { Router } from 'express';
import { signin, signup, refreshTokenrequest } from '../controllers/authController'
export const router = Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/refresh-token', refreshTokenrequest)
