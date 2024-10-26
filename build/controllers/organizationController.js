"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUsereToOrganization = exports.deleteOrganization = exports.updateOrganization = exports.getAllOrganizations = exports.getOrganization = exports.createOrganization = void 0;
const errorHandlers_1 = __importDefault(require("../utils/errorHandlers"));
const organizationService_1 = require("../services/organizationService");
const createOrganization = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield (0, organizationService_1.createOrg)(request.body);
        response.status(200).json({ organization_id: id });
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.createOrganization = createOrganization;
const getOrganization = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield (0, organizationService_1.getOrg)(request.params.organization_id);
        if (organization) {
            response.status(200).json(organization);
        }
        else {
            response.status(404).json({ message: "This organization doesn't exist" });
        }
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.getOrganization = getOrganization;
const getAllOrganizations = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield (0, organizationService_1.getAllOrg)();
        if (organizations) {
            response.status(200).json(organizations);
        }
        else {
            response.status(404).json("There're not any organizations yet");
        }
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.getAllOrganizations = getAllOrganizations;
const updateOrganization = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield (0, organizationService_1.updateOrg)(request.params.organization_id, request.body);
        if (organization) {
            response.status(200).json(organization);
        }
        else {
            response.status(404).json({ message: 'This organization does not exist' });
        }
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.updateOrganization = updateOrganization;
const deleteOrganization = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, organizationService_1.deleteOrg)(request.params.organization_id);
        response.status(200).json({ message: 'Organization deleted successfully' });
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.deleteOrganization = deleteOrganization;
const inviteUsereToOrganization = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, organizationService_1.inviteUserToOrg)(request.params.organization_id, request.body.user_email);
        response.status(200).json({ message: 'User invited successfully to the organization' });
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.inviteUsereToOrganization = inviteUsereToOrganization;
