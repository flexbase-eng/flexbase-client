import { compose, rest as mockServer } from 'msw'
import path from 'path';
import fs from 'fs';
import { badDocId, errorDocId, mockUrl } from '../constants';

export const doc_handlers = [
    mockServer.get(mockUrl + "/doc/:docId", (request, response, context) => {

        const { docId } = request.params;

        if (!docId || docId === errorDocId) {
            const res = compose(
                context.status(400),
            );
            return response(res);
        }
        else if (docId === badDocId) {
            const res = compose(
                context.status(400),
                context.json({
                    success: false,
                    error: "Error message"
                })
            );
            return response(res);
        }

        const imageBuffer = fs.readFileSync(path.resolve(__dirname, '../files/person_pic.jpeg'))

        const bytes = new Uint8Array(59);

        for (let i = 0; i < 59; i++) {
            bytes[i] = 32 + i;
        }

        const res = compose(
            context.status(200),
            context.set('Content-Length', imageBuffer.byteLength.toString()),
            context.set('Content-Type', 'image/jpeg'),
            context.body(imageBuffer)
        );

        return response(res);
    }),
]
