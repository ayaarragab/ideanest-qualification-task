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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserToOrg = exports.deleteOrg = exports.updateOrg = exports.getAllOrg = exports.getOrg = exports.createOrg = void 0;
const organization_1 = __importDefault(require("../models/organization"));
const user_1 = __importDefault(require("../models/user"));
const createOrg = (organizationData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield organization_1.default.create({ name: organizationData.name, description: organizationData.description });
        return organization.id;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createOrg = createOrg;
const getOrg = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield organization_1.default.findById(organizationId);
        if (!organization) {
            return false;
        }
        const organizationContent = {
            organization_id: organization.id,
            name: organization.name,
            description: organization.description,
            organization_members: []
        };
        if (organization.organization_members && organization.organization_members.length > 0) {
            const members = yield Promise.all(organization.organization_members.map((memberId) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield user_1.default.findById(memberId);
                if (user) {
                    const _a = user.toObject(), { _id } = _a, userWithoutId = __rest(_a, ["_id"]);
                    return userWithoutId;
                }
                return null;
            })));
            organizationContent.organization_members = members.filter((user) => user !== null);
        }
        return organizationContent;
    }
    catch (error) {
        console.error("Error fetching organization:", error);
        return false;
    }
});
exports.getOrg = getOrg;
const getAllOrg = () => __awaiter(void 0, void 0, void 0, function* () {
    const organizations = yield organization_1.default.find({});
    const organizationsContent = yield Promise.all(organizations.map((organization) => __awaiter(void 0, void 0, void 0, function* () {
        const org = yield (0, exports.getOrg)(organization.id);
        return org ? org : null;
    })));
    return organizationsContent.filter(org => org !== null);
});
exports.getAllOrg = getAllOrg;
const updateOrg = (organizationId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield organization_1.default.findByIdAndUpdate(organizationId, { $set: updateData }, { new: true });
        if (organization) {
            return {
                organization_id: organization.id,
                name: organization.name,
                description: organization.description
            };
        }
        return false;
    }
    catch (error) {
        console.error("Error updating organization:", error);
        return false;
    }
});
exports.updateOrg = updateOrg;
const deleteOrg = (organizationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield organization_1.default.findByIdAndDelete(organizationId);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.deleteOrg = deleteOrg;
const inviteUserToOrg = (organizationId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization = yield organization_1.default.findById(organizationId);
        if (!organization) {
            console.log("Organization not found");
            return false;
        }
        const user = yield user_1.default.findOne({ email: userEmail });
        if (!user) {
            console.log("User not found");
            return false;
        }
        if (!organization.organization_members.includes(user._id)) {
            console.log("Adding user to organization members");
            organization.organization_members.push(user._id);
            yield organization.save();
        }
        return true;
    }
    catch (error) {
        console.error("Error inviting user to organization:", error);
        return false;
    }
});
exports.inviteUserToOrg = inviteUserToOrg;
