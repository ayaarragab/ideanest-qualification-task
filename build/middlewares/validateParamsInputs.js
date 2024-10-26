"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrganizationId = void 0;
const express_validator_1 = require("express-validator");
exports.validateOrganizationId = [
    (0, express_validator_1.param)('organization_id')
        .exists().withMessage('Organization ID is required')
];
