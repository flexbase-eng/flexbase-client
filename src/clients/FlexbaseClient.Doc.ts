import { FlexbaseClientBase } from './FlexbaseClient.Base';

export class FlexbaseClientDoc extends FlexbaseClientBase {
    async getDocumentImage(docId: string): Promise<ArrayBuffer | null> {
        try {
            const response = await this.client.url(`/doc/${docId}`).get().arrayBuffer();

            return response;
        } catch (error) {
            this.logger.error('Unable to get the image', error);
            return null;
        }
    }
}
