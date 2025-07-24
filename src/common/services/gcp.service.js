import { Storage } from '@google-cloud/storage';
import { join, dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class StorageService {
  constructor() {
    console.log(__dirname);
    
    this.storage = new Storage({
      keyFilename: join(__dirname, '../../config/gcs-keyfile.json'),
      projectId: process.env.GCLOUD_PROJECT_ID
    });
    this.bucketName = process.env.GCLOUD_BUCKET_NAME;
    this.bucket = this.storage.bucket(this.bucketName);
  }

  /**
   * Uploads an image file to GCS and makes it publicly accessible
   * @param {Buffer} fileBuffer - The file buffer to upload
   * @param {string} originalName - Original filename
   * @param {string} folder - Destination folder (optional)
   * @returns {Promise<{publicUrl: string, fileName: string}>} 
   */
  async uploadImage(fileBuffer, originalName, folder = '') {
    try {
      const extension = originalName.split('.').pop();
      const fileName = `${folder}${uuidv4()}.${extension}`;
      const file = this.bucket.file(fileName);
      

      await file.save(fileBuffer, {
        resumable: false,
        metadata: {
          contentType: this._getContentType(extension),
        },
      });
      // await file.makePublic();

      return {
        publicUrl: `https://storage.googleapis.com/${this.bucketName}/${fileName}`,
        fileName: fileName
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  }
  /**
   * Generates a signed URL for temporary access
   * @param {string} fileName - The filename
   * @returns {Promise<string>}
   */
  async getSignedUrl(fileName) {
    try {
      const [url] = await this.bucket.file(fileName).getSignedUrl({
        version: 'v4',
        action: 'read'
      });
      return url;
    } catch (error) {
      console.error('Error generating signed URL:', error);
      throw new Error('Failed to generate signed URL');
    }
  }

  /**
   * Gets content type based on file extension
   * @private
   */
  _getContentType(extension) {
    const types = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',
    };
    return types[extension.toLowerCase()] || 'application/octet-stream';
  }
}

export default new StorageService();