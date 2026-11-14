import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const PUBLIC_HERO_PATH = path.join(process.cwd(), 'public', 'hero-bg.png');

export async function GET() {
  try {
    if (fs.existsSync(PUBLIC_HERO_PATH)) {
      const stats = fs.statSync(PUBLIC_HERO_PATH);
      return NextResponse.json({
        exists: true,
        url: `/hero-bg.png?t=${Math.floor(stats.mtimeMs)}`
      });
    }
    return NextResponse.json({ exists: false, url: null });
  } catch (error: any) {
    return NextResponse.json({ exists: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure public folder exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write file to public/hero-bg.png
    fs.writeFileSync(PUBLIC_HERO_PATH, buffer);

    const timestamp = Date.now();
    return NextResponse.json({
      success: true,
      url: `/hero-bg.png?t=${timestamp}`
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save hero background' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    if (fs.existsSync(PUBLIC_HERO_PATH)) {
      fs.unlinkSync(PUBLIC_HERO_PATH);
    }
    return NextResponse.json({ success: true, message: 'Hero background reset to default' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

