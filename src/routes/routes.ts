import { Router } from 'express';
import { signin, signup, refreshTokenrequest } from '../controllers/authController'
import { validateInputSignup, validateInputSignin, validateRefreshToken, validateOrganization } from '../middlewares/validateBodyInputs';
import { handleValidationErrors } from '../middlewares/validationErrorsHandle';
import { emailExists, orgExists } from '../middlewares/validationErrorsHandle';
import { isAuthorized } from '../middlewares/validateAuthorization';
import { createOrganization, getOrganization } from '../controllers/organizationController';
import { validateOrganizationId } from '../middlewares/validateParamsInputs';

export const router = Router();

/**
 * Auth endpoints
 */
router.post('/signup', validateInputSignup, handleValidationErrors, emailExists, signup);
router.post('/signin', validateInputSignin, handleValidationErrors, signin);
router.post('/refresh-token', validateRefreshToken, handleValidationErrors, refreshTokenrequest)


/**
 * Organization endpoints
 */
router.post('/organization', isAuthorized, validateOrganization, orgExists, handleValidationErrors, createOrganization)
router.get('/organization/:organization_id', isAuthorized, validateOrganizationId, handleValidationErrors, getOrganization)
