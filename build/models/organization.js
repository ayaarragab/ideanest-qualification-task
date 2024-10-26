"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrganizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    organization_members: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});
const Organization = (0, mongoose_1.model)('Organization', OrganizationSchema);
exports.default = Organization;
