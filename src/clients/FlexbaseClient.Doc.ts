import { FlexbaseClientBase } from './FlexbaseClient.Base';

interface ImageResponse {
  blobURL?: string;
  success: boolean;
  error?: string;
}

export class FlexbaseDocsClient extends FlexbaseClientBase {
  async getImage(docId: string): Promise<ImageResponse | null> {
    try {
      const response = await this.client.url(`/doc/${docId}`).get().blob();

      const blobURL = URL.createObjectURL(response);

      return { success: true, blobURL };
    } catch (error) {
      this.logger.error('Unable to get the image', error);
      return null;
    }
  }
}