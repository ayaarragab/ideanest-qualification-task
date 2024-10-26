import { param } from 'express-validator';

export const validateOrganizationId = [
    param('organization_id')
        .exists().withMessage('Organization ID is required')
        .isUUID().withMessage('Organization ID must be a valid UUID')
];
