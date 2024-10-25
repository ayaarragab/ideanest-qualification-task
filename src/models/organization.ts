import { Schema, model, Document } from 'mongoose';
import { IUser } from './user';

interface IOrganization extends Document {
    name: string;
    description: string;
    organization_members: Array<IUser>;
    createdAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    organization_members: { type: [Schema.Types.ObjectId], ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

const Organization = model<IOrganization>('Organization', OrganizationSchema);

export default Organization;
