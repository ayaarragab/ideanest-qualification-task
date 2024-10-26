import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user';

export interface IOrganization extends Document {
  name: string;
  description: string;
  organization_members: Array<Types.ObjectId>;
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
