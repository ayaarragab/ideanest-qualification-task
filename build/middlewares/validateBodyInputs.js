"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserEmail = exports.validateOrganizationUpdate = exports.validateOrganization = exports.validateRefreshToken = exports.validateInputSignin = exports.validateInputSignup = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validation for Auth endpoints
 */
exports.validateInputSignup = [
    (0, express_validator_1.body)('name')
        .notEmpty().isString().withMessage('Name must be a string'),
    (0, express_validator_1.body)('email')
        .notEmpty().isString().isEmail().withMessage('Email must be a valid email string'),
    (0, express_validator_1.body)('password')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password must not be empty')
        .isLength({ min: 8, max: 8 }).withMessage('Password must be exactly 8 characters')
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)[\w\W]+$/)
        .withMessage('Password must contain at least one letter, one number, and can include special characters'),
];
exports.validateInputSignin = [
    (0, express_validator_1.body)('email')
        .exists().withMessage('Email is required')
        .notEmpty().isString().isEmail().withMessage('Email must be a valid email string'),
    (0, express_validator_1.body)('password')
        .exists().withMessage('Password is required')
        .notEmpty().withMessage('Password must not be empty')
];
exports.validateRefreshToken = [
    (0, express_validator_1.body)('refresh_token')
        .exists().withMessage('Refresh token is required')
        .isString().withMessage('Refresh token must be a string')
        .notEmpty().withMessage('Refresh token cannot be empty'),
];
/**
 * Validation for Organization endpoints
 */
exports.validateOrganization = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name should be a string'),
    (0, express_validator_1.body)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description should be a string')
        .isLength({ min: 10, max: 200 })
        .withMessage('Description must be between 10 and 200 characters')
];
exports.validateOrganizationUpdate = [
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('Name should be a string'),
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('Description should be a string')
        .isLength({ min: 10, max: 200 })
        .withMessage('Description must be between 10 and 200 characters')
];
exports.validateUserEmail = [
    (0, express_validator_1.body)('user_email')
        .notEmpty().isString().isEmail().withMessage('Email must be a valid email string'),
];
