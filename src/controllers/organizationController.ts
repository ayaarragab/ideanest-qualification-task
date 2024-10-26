import { Response, Request } from "express";
import serverErrorsHandler from "../utils/errorHandlers";
import { createOrg, getOrg } from "../services/organizationService";

export const createOrganization = async (request: Request<{}, {}, { name: string, description: string }>, response: Response) => {
    try {
        const id = await createOrg(request.body);
        response.status(200).json({organization_id: id});
    } catch (error) {
        serverErrorsHandler(response, error);
    }
}

export const getOrganization = async (request: Request<{ organization_id: string }, {}, {}>, response: Response) => {
    try {
        const organization = await getOrg(request.params.organization_id);
        response.status(200).json(organization);
    } catch (error) {
        serverErrorsHandler(response, error);
    }
}
