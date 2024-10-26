import { Response, Request } from "express";
import serverErrorsHandler from "../utils/errorHandlers";
import { createOrg, getOrg, getAllOrg, updateOrg, deleteOrg, inviteUserToOrg } from "../services/organizationService";

export const createOrganization = async (request: Request<{}, {}, { name: string, description: string }>, response: Response) => {
  try {
    const id = await createOrg(request.body);
    response.status(200).json({ organization_id: id });
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const getOrganization = async (request: Request<{ organization_id: string }, {}, {}>, response: Response) => {
  try {
    const organization = await getOrg(request.params.organization_id);
    if (organization) {
      response.status(200).json(organization);
    }
    else {
      response.status(404).json({ message: "This organization doesn't exist" });
    }
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const getAllOrganizations = async (request: Request, response: Response) => {
  try {
    const organizations = await getAllOrg();
    if (organizations) {
      response.status(200).json(organizations);
    } else {
      response.status(404).json("There're not any organizations yet");
    }
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const updateOrganization = async (request: Request<{ organization_id: string }, {}, { name: string, description: string }>, response: Response) => {
  try {
    const organization = await updateOrg(request.params.organization_id, request.body);
    if (organization) {
      response.status(200).json(organization);
    } else {
      response.status(404).json({ message: 'This organization does not exist' });
    }
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const deleteOrganization = async (request: Request<{ organization_id: string }, {}, {}>, response: Response) => {
  try {
    await deleteOrg(request.params.organization_id);
    response.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}

export const inviteUsereToOrganization = async (request: Request<{ organization_id: string }, {}, { user_email: string }>, response: Response) => {
  try {
    await inviteUserToOrg(request.params.organization_id, request.body.user_email);
    response.status(200).json({ message: 'User invited successfully to the organization' });
  } catch (error) {
    serverErrorsHandler(response, error);
  }
}
