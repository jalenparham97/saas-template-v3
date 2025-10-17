import { s3 } from '@/lib/s3';
import { generateAvatarImage } from '@/utils/generate-avatar-image';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { seed, key } = body as {
    seed: string;
    key: string;
  };

  try {
    const avatarImage = generateAvatarImage(seed);
    await s3.uploadFile(key, avatarImage, 'image/svg+xml');
    const url = s3.createImageUploadUrl(key);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate avatar' },
      { status: 500 }
    );
  }
}
