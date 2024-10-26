import Organization from "../models/organization";
import User from "../models/user";
import { IUser } from "../models/user";

export const createOrg = async (organizationData: {name: string, description: string}) => {
    try {
        const organization = await Organization.create({ name: organizationData.name, description: organizationData.description });
        return organization.id;
    } catch (error) {
        console.log(error);
    }
}

export const getOrg = async(organizationId: string) => {
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
        }
        if (!organization.organization_members) {
            return organizationContent;
        }
        organization.organization_members.forEach(async (memberId) => {
            try {
                const user = await User.findById(memberId);
                if (user) {
                    organizationContent.organization_members.push(user);
                }
            } catch (error) {
                console.log(error);
            }
        });
        return organizationContent;
    } catch (error) {
        return false;
    }
}
