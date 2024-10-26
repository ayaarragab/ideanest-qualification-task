import { param } from 'express-validator';

export const validateOrganizationId = [
  param('organization_id')
    .exists().withMessage('Organization ID is required')
];
