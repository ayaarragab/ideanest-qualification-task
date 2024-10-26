"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateBodyInputs_1 = require("../middlewares/validateBodyInputs");
const validationErrorsHandle_1 = require("../middlewares/validationErrorsHandle");
const validationErrorsHandle_2 = require("../middlewares/validationErrorsHandle");
const validateAuthorization_1 = require("../middlewares/validateAuthorization");
const organizationController_1 = require("../controllers/organizationController");
const validateParamsInputs_1 = require("../middlewares/validateParamsInputs");
exports.router = (0, express_1.Router)();
/**
 * Auth endpoints
 */
exports.router.post('/signup', validateBodyInputs_1.validateInputSignup, validationErrorsHandle_1.handleValidationErrors, validationErrorsHandle_2.emailExists, authController_1.signup);
exports.router.post('/signin', validateBodyInputs_1.validateInputSignin, validationErrorsHandle_1.handleValidationErrors, authController_1.signin);
exports.router.post('/refresh-token', validateBodyInputs_1.validateRefreshToken, validationErrorsHandle_1.handleValidationErrors, authController_1.refreshTokenrequest);
/**
 * Organization endpoints
 */
exports.router.post('/organization', validateAuthorization_1.isAuthorized, validateBodyInputs_1.validateOrganization, validationErrorsHandle_2.orgExists, validationErrorsHandle_1.handleValidationErrors, organizationController_1.createOrganization);
exports.router.get('/organization/:organization_id', validateAuthorization_1.isAuthorized, validateParamsInputs_1.validateOrganizationId, validationErrorsHandle_1.handleValidationErrors, organizationController_1.getOrganization);
exports.router.get('/organization', validateAuthorization_1.isAuthorized, organizationController_1.getAllOrganizations);
exports.router.put('/organization/:organization_id', validateAuthorization_1.isAuthorized, validateParamsInputs_1.validateOrganizationId, validateBodyInputs_1.validateOrganizationUpdate, validationErrorsHandle_1.handleValidationErrors, organizationController_1.updateOrganization);
exports.router.delete('/organization/:organization_id', validateAuthorization_1.isAuthorized, validateParamsInputs_1.validateOrganizationId, validationErrorsHandle_1.handleValidationErrors, organizationController_1.deleteOrganization);
exports.router.post('/organization/:organization_id/invite', validateAuthorization_1.isAuthorized, validateParamsInputs_1.validateOrganizationId, validateBodyInputs_1.validateUserEmail, validationErrorsHandle_1.handleValidationErrors, organizationController_1.inviteUsereToOrganization);
