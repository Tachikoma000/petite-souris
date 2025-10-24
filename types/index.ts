export type ConversionStatus = 'idle' | 'uploading' | 'converting' | 'success' | 'error';

export type FileType = 'pdf' | 'docx' | 'doc' | 'txt' | 'rtf' | 'odt' | 'html';

export interface ConversionState {
  status: ConversionStatus;
  progress?: number;
  error?: string;
  fileName?: string;
}

export interface FileConversion {
  id: string;
  file: File;
  inputFormat: FileType;
  outputFormat: FileType;
  status: ConversionStatus;
  error?: string;
  downloadUrl?: string;
}

export interface ConversionResponse {
  success: boolean;
  error?: string;
  data?: Blob;
}

export interface FormatInfo {
  extension: string;
  mimeType: string;
  name: string;
}

export const SUPPORTED_FORMATS: Record<FileType, FormatInfo> = {
  pdf: {
    extension: 'pdf',
    mimeType: 'application/pdf',
    name: 'PDF Document',
  },
  docx: {
    extension: 'docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: 'Word Document (DOCX)',
  },
  doc: {
    extension: 'doc',
    mimeType: 'application/msword',
    name: 'Word Document (DOC)',
  },
  txt: {
    extension: 'txt',
    mimeType: 'text/plain',
    name: 'Plain Text',
  },
  rtf: {
    extension: 'rtf',
    mimeType: 'application/rtf',
    name: 'Rich Text Format',
  },
  odt: {
    extension: 'odt',
    mimeType: 'application/vnd.oasis.opendocument.text',
    name: 'OpenDocument Text',
  },
  html: {
    extension: 'html',
    mimeType: 'text/html',
    name: 'HTML Document',
  },
};
