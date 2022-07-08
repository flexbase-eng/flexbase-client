import { FlexbaseClientBase } from './FlexbaseClient.Base';

export class FlexbaseClientDoc extends FlexbaseClientBase {
  async getDocumentImage(docId: string): Promise<ArrayBuffer | null> {
    try {

      return await this.client.url(`/doc/${docId}`).get().arrayBuffer();

    } catch (error) {
      this.logger.error('Unable to get the image', error);
      return null;
    }
  }
}