import { slugify } from '@/utils/slugify';
import imageCompression, { type Options } from 'browser-image-compression';

/**
 * Compresses an image file using browser-image-compression.
 *
 * - Converts the image to WebP format
 * - Limits the file size to 1MB and max width/height to 1920px
 * - Uses a web worker for performance
 *
 * @param file - The original image file to compress
 * @returns A Promise that resolves to the compressed File (WebP), or the original file if compression fails
 */
export async function compressImage(file: File): Promise<File> {
  // Compression options
  const options: Options = {
    maxSizeMB: 1, // Maximum file size in megabytes
    maxWidthOrHeight: 1920, // Maximum width or height in pixels
    useWebWorker: true, // Use a web worker for better performance
    fileType: 'image/webp', // Output file type
  };
  try {
    // Compress the image file
    const compressedFile = await imageCompression(file, options);
    // Use the original file name (without extension) and add .webp
    const fileName = slugify(file.name.split('.')[0]);
    // Return a new File object with the compressed data and correct type
    return new File([compressedFile], `${fileName}.webp`, {
      type: compressedFile.type,
    });
  } catch (error) {
    // If compression fails, log the error and return the original file
    console.error('Image compression failed:', error);
    return file;
  }
}
