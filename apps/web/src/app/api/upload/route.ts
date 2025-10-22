import { env } from '@/env';
import { auth } from '@/lib/auth';
import { tigrisClient } from '@/lib/s3';
import { IMAGE_MIME_TYPE } from '@/types/utility.types';
import {
  createUploadRouteHandler,
  RejectUpload,
  route,
} from 'better-upload/server';
import { headers } from 'next/headers';

// const MAX_FILE_SIZE = 1024 * 1024 * 4; // Only 4 MB files
const MAX_LOGO_SIZE = 1024 * 1024; // Only 1 MB files

async function checkAuthSession(headers: Headers) {
  const session = await auth.api.getSession({ headers });
  if (!session || !session?.user?.id) {
    throw new RejectUpload('Unauthorized');
  }
  return session.user.id;
}

export const { POST } = createUploadRouteHandler({
  client: tigrisClient,
  bucketName: env.S3_BUCKET_NAME,
  routes: {
    accountLogoUpload: route({
      fileTypes: IMAGE_MIME_TYPE,
      maxFileSize: MAX_LOGO_SIZE,
      onBeforeUpload: async ({ file }) => {
        const userId = await checkAuthSession(await headers());
        return {
          objectInfo: {
            key: `users/${userId}/logo/${file.name}`,
          },
        };
      },
    }),
  },
});
