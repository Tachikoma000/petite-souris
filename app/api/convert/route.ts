import { NextRequest, NextResponse } from 'next/server';
import { convertFile } from '@/lib/cloudconvert';
import { FileType, SUPPORTED_FORMATS } from '@/types';

const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760');

function getFileExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.');
  return parts[parts.length - 1];
}

function isValidFileType(extension: string): extension is FileType {
  return extension in SUPPORTED_FORMATS;
}

function determineOutputFormat(inputFormat: FileType): FileType {
  // Default conversion logic: convert to PDF if not PDF, convert to DOCX if PDF
  if (inputFormat === 'pdf') {
    return 'docx';
  }
  return 'pdf';
}

export async function POST(request: NextRequest) {
  try {
    // Get the file from the request
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const requestedOutputFormat = formData.get('outputFormat') as string | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 413 }
      );
    }

    // Determine file type from extension
    const extension = getFileExtension(file.name);

    if (!isValidFileType(extension)) {
      const supportedExtensions = Object.keys(SUPPORTED_FORMATS).join(', ');
      return NextResponse.json(
        { error: `Invalid file type. Supported formats: ${supportedExtensions}` },
        { status: 400 }
      );
    }

    const inputFormat: FileType = extension;

    // Determine output format
    let outputFormat: FileType;
    if (requestedOutputFormat && isValidFileType(requestedOutputFormat)) {
      outputFormat = requestedOutputFormat as FileType;
    } else {
      outputFormat = determineOutputFormat(inputFormat);
    }

    // Don't convert if input and output are the same
    if (inputFormat === outputFormat) {
      return NextResponse.json(
        { error: 'Input and output formats cannot be the same' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Perform conversion
    const convertedBuffer = await convertFile(buffer, inputFormat, outputFormat);

    // Prepare output filename and content type
    const outputFileName = file.name.replace(
      new RegExp(`\\.${inputFormat}$`, 'i'),
      `.${outputFormat}`
    );
    const contentType = SUPPORTED_FORMATS[outputFormat].mimeType;

    // Return the converted file
    return new NextResponse(new Uint8Array(convertedBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${outputFileName}"`,
        'Content-Length': convertedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Conversion failed' },
      { status: 500 }
    );
  }
}
