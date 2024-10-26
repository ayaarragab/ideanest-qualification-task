import Organization from "../models/organization";
import User from "../models/user";
import { IUser } from "../models/user";
import mongoose from "mongoose";

export const createOrg = async (organizationData: {name: string, description: string}) => {
    try {
        const organization = await Organization.create({ name: organizationData.name, description: organizationData.description });
        return organization.id;
    } catch (error) {
        console.log(error);
    }
}

export const getOrg = async (organizationId: string) => {
    try {
        const organization = await Organization.findById(organizationId);
        
        if (!organization) {
            return false;
        }

        const organizationContent: {
            organization_id: string,
            name: string,
            description: string,
            organization_members: IUser[]
        } = {
            organization_id: organization.id,
            name: organization.name,
            description: organization.description,
            organization_members: []
        };

        if (organization.organization_members && organization.organization_members.length > 0) {
            const members = await Promise.all(
                organization.organization_members.map(async (memberId) => {
                    const user = await User.findById(memberId);
                    if (user) {
                        const { _id, ...userWithoutId } = user.toObject();
                        return userWithoutId;
                    }
                    return null;
                })
            );
            organizationContent.organization_members = members.filter((user): user is IUser => user !== null);
        }

        return organizationContent;
    } catch (error) {
        console.error("Error fetching organization:", error);
        return false;
    }
};


export const getAllOrg = async () => {
    const organizations = await Organization.find({});
    
    const organizationsContent = await Promise.all(
        organizations.map(async (organization) => {
            const org = await getOrg(organization.id);
            return org ? org : null;
        })
    );

    return organizationsContent.filter(org => org !== null);
};

export const updateOrg = async (organizationId: string, updateData: {name?: string, description?: string}) => {
    try {
        const organization = await Organization.findByIdAndUpdate(
            organizationId, 
            { $set: updateData }, 
            { new: true }
        );
        if (organization) {
            return {
                organization_id: organization.id, 
                name: organization.name, 
                description: organization.description
            };
        }
        return false;
    } catch (error) {
        console.error("Error updating organization:", error);
        return false;
    }
}

export const deleteOrg =  async (organizationId: string) => {
    try {
        const organization = await Organization.findByIdAndDelete(organizationId);
        return true;
    } catch (error) {
        return false;
    }
}

export const inviteUserToOrg = async (organizationId: string, userEmail: string) => {
    try {
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            console.log("Organization not found");
            return false;
        }

        const user = await User.findOne({ email: userEmail });
        if (!user) {
            console.log("User not found");
            return false;
        }

        if (!organization.organization_members.includes(user._id)) {
            console.log("Adding user to organization members");
            organization.organization_members.push(user._id);
            await organization.save();
        }
        return true;
    } catch (error) {
        console.error("Error inviting user to organization:", error);
        return false;
    }
};
