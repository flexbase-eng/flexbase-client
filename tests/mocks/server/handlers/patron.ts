import { compose, rest as mockServer } from 'msw'
import { badCompanyId, errorCompanyId, goodCompanyId, mockUrl } from '../constants';

interface PatronData {
    id?: string;
    name?: string;
    address?: string;
    state?: string;
    city?: string;
    postalCode?: string;
  }

export const patron_handlers = [
    mockServer.get(mockUrl + "/clients/:clientId", (request, response, context) => {

        const { clientId } = request.params;

        if (clientId === errorCompanyId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (clientId === badCompanyId) {
            const res = compose(
                context.status(200),
                context.json([])
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json([
                {
                    id: clientId || goodCompanyId,
                    name: "Test",
                    tenantId: "Tenant",
                }
            ]),

        );
        
        return response(res);
    }),

    mockServer.get(mockUrl + "/clients", (_, response, context) => {
        const res = compose(
            context.status(200),
            context.json([
                {
                    id: goodCompanyId,
                    name: "Test",
                    tenantId: "Tenant",
                }

            ]),

        );

        return response(res);
    }),

    mockServer.post(mockUrl + "/clients", (request, response, context) => {

        if(request.body && Object.keys(request.body).length === 0) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }

        const res = compose(
            context.status(200),
            context.json(
                request.body
            ),

        );

        return response(res);
    }),
]