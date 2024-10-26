import { body } from "express-validator";


/**
 * Validation for Auth endpoints
 */

export const validateInputSignup = [
  body('name')
    .notEmpty().isString().withMessage('Name must be a string'),

  body('email')
    .notEmpty().isString().isEmail().withMessage('Email must be a valid email string'),

  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('Password must not be empty')
    .isLength({ min: 8, max: 8 }).withMessage('Password must be exactly 8 characters')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)[\w\W]+$/)
    .withMessage('Password must contain at least one letter, one number, and can include special characters'),
]

export const validateInputSignin = [
  body('email')
    .exists().withMessage('Email is required')
    .notEmpty().isString().isEmail().withMessage('Email must be a valid email string'),

  body('password')
    .exists().withMessage('Password is required')
    .notEmpty().withMessage('Password must not be empty')
]

export const validateRefreshToken = [
  body('refresh_token')
    .exists().withMessage('Refresh token is required')
    .isString().withMessage('Refresh token must be a string')
    .notEmpty().withMessage('Refresh token cannot be empty'),
];

/**
 * Validation for Organization endpoints
 */

export const validateOrganization = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a string'),

  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description should be a string')
    .isLength({ min: 10, max: 200 })
    .withMessage('Description must be between 10 and 200 characters')
];
