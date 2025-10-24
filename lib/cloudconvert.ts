import CloudConvert from 'cloudconvert';
import { FileType } from '@/types';

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY || '');

export async function convertFile(
  fileBuffer: Buffer,
  inputFormat: FileType,
  outputFormat: FileType
): Promise<Buffer> {
  try {
    // Create a conversion job
    const job = await cloudConvert.jobs.create({
      tasks: {
        'upload-file': {
          operation: 'import/upload',
        },
        'convert-file': {
          operation: 'convert',
          input: 'upload-file',
          output_format: outputFormat,
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file',
        },
      },
    });

    // Upload the file using the SDK's upload method
    const uploadTask = job.tasks.find(task => task.name === 'upload-file');
    
    if (!uploadTask?.id) {
      throw new Error('Upload task not found');
    }

    // Upload file directly using the CloudConvert SDK
    // CloudConvert requires a filename with extension, not just the format
    const filename = `file.${inputFormat}`;
    await cloudConvert.tasks.upload(uploadTask, fileBuffer, filename);

    // Wait for the job to complete
    const completedJob = await cloudConvert.jobs.wait(job.id);

    // Find the export task
    const exportTask = completedJob.tasks.find(
      task => task.name === 'export-file' && task.status === 'finished'
    );

    if (!exportTask?.result?.files?.[0]?.url) {
      // Log the job for debugging
      console.error('Job details:', JSON.stringify(completedJob, null, 2));
      throw new Error('Export task failed or file URL not found');
    }

    // Download the converted file
    const file = exportTask.result.files[0];
    
    if (!file.url) {
      throw new Error('File URL not found in export task');
    }
    
    const response = await fetch(file.url);

    if (!response.ok) {
      throw new Error(`Failed to download converted file: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    
    // Clean up the job
    try {
      await cloudConvert.jobs.delete(job.id);
    } catch (deleteError) {
      console.warn('Failed to delete job:', deleteError);
      // Don't throw here, file conversion was successful
    }

    return Buffer.from(arrayBuffer);
  } catch (error) {
    console.error('CloudConvert error:', error);
    
    // Provide more detailed error messages
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw new Error('File conversion failed. Please try again.');
  }
}

export async function convertPdfToDocx(fileBuffer: Buffer): Promise<Buffer> {
  return convertFile(fileBuffer, 'pdf', 'docx');
}

export async function convertDocxToPdf(fileBuffer: Buffer): Promise<Buffer> {
  return convertFile(fileBuffer, 'docx', 'pdf');
}
