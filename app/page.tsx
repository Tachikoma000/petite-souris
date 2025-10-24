'use client';

import { useState, useCallback } from 'react';
import FileUploader from '@/components/FileUploader';
import FormatSelector from '@/components/FormatSelector';
import FileList from '@/components/FileList';
import { FileType, FileConversion } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trash2 } from 'lucide-react';

const MAX_FILE_SIZE = parseInt(process.env.NEXT_PUBLIC_MAX_FILE_SIZE || '10485760');

export default function Home() {
  const [files, setFiles] = useState<FileConversion[]>([]);
  const [inputFormat, setInputFormat] = useState<FileType>('pdf');
  const [outputFormat, setOutputFormat] = useState<FileType>('docx');
  const [isConverting, setIsConverting] = useState(false);

  const getFileExtension = (filename: string): FileType => {
    const ext = filename.toLowerCase().split('.').pop() || 'pdf';
    return ext as FileType;
  };

  const getOutputFileName = (inputFileName: string, outputExt: string): string => {
    const lastDotIndex = inputFileName.lastIndexOf('.');
    if (lastDotIndex > 0) {
      return inputFileName.substring(0, lastDotIndex) + '.' + outputExt;
    }
    return 'converted-file.' + outputExt;
  };

  const handleFileSelect = useCallback((file: File) => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    // Validate file type
    const fileName = file.name.toLowerCase();
    const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.rtf', '.odt', '.html'];
    if (!validExtensions.some(ext => fileName.endsWith(ext))) {
      alert('Invalid file type. Supported formats: PDF, DOCX, DOC, TXT, RTF, ODT, HTML');
      return;
    }

    // Detect input format
    const detectedFormat = getFileExtension(file.name);
    
    // Check if input and output formats are the same
    if (detectedFormat === outputFormat) {
      alert(`Cannot convert ${detectedFormat.toUpperCase()} to ${outputFormat.toUpperCase()}. Please select a different output format.`);
      return;
    }

    // Add file to the list
    const newFile: FileConversion = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      inputFormat: detectedFormat,
      outputFormat,
      status: 'idle',
    };

    setFiles(prev => [...prev, newFile]);
  }, [outputFormat]);

  const convertFile = async (fileConversion: FileConversion): Promise<void> => {
    const { id, file, outputFormat } = fileConversion;

    try {
      // Update status to uploading
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'uploading' as const } : f
      ));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('outputFormat', outputFormat);

      // Update status to converting
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'converting' as const } : f
      ));

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Conversion failed');
      }

      // Get the converted file as blob
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const outputFileName = getOutputFileName(file.name, outputFormat);

      // Update status to success and store download URL
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'success' as const, downloadUrl, error: undefined } : f
      ));

      // Auto-download the file
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (err) {
      console.error('Conversion error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      
      setFiles(prev => prev.map(f => 
        f.id === id ? { ...f, status: 'error' as const, error: errorMessage } : f
      ));
    }
  };

  const handleStartConversions = async () => {
    const filesToConvert = files.filter(f => f.status === 'idle');
    
    if (filesToConvert.length === 0) {
      alert('No files to convert');
      return;
    }

    setIsConverting(true);

    // Convert files one at a time (to avoid overwhelming the API)
    for (const file of filesToConvert) {
      await convertFile(file);
    }

    setIsConverting(false);
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.downloadUrl) {
        URL.revokeObjectURL(file.downloadUrl);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleDownloadFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file?.downloadUrl) {
      const outputFileName = getOutputFileName(file.file.name, file.outputFormat);
      const a = document.createElement('a');
      a.href = file.downloadUrl;
      a.download = outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleClearAll = () => {
    // Clean up download URLs
    files.forEach(file => {
      if (file.downloadUrl) {
        URL.revokeObjectURL(file.downloadUrl);
      }
    });
    setFiles([]);
  };

  const pendingCount = files.filter(f => f.status === 'idle').length;
  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Petite Souris
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between PDF, Word, Text, and other document formats instantly
          </p>
        </div>

        {/* Format Selector */}
        <div className="mb-6">
          <FormatSelector
            inputFormat={inputFormat}
            outputFormat={outputFormat}
            onInputChange={setInputFormat}
            onOutputChange={setOutputFormat}
            disabled={isConverting}
          />
        </div>

        {/* File Uploader */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <FileUploader onFileSelect={handleFileSelect} disabled={isConverting} />
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="font-semibold">Files ({files.length})</h3>
                  {successCount > 0 && (
                    <Badge variant="default" className="bg-green-600">
                      {successCount} Completed
                    </Badge>
                  )}
                  {errorCount > 0 && (
                    <Badge variant="destructive">
                      {errorCount} Failed
                    </Badge>
                  )}
                  {pendingCount > 0 && (
                    <Badge variant="secondary">
                      {pendingCount} Pending
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  {pendingCount > 0 && (
                    <Button
                      onClick={handleStartConversions}
                      disabled={isConverting}
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Convert {pendingCount} {pendingCount === 1 ? 'File' : 'Files'}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    disabled={isConverting}
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
              
              <FileList
                files={files}
                onRemove={handleRemoveFile}
                onDownload={handleDownloadFile}
              />
            </CardContent>
          </Card>
        )}

        {/* How to Use */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-center mb-6">How to Use</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="font-semibold mb-2">Select Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Choose what format to convert from and to
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="font-semibold mb-2">Add Files</h3>
                <p className="text-sm text-muted-foreground">
                  Upload one or multiple files (max 10MB each)
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="font-semibold mb-2">Start Converting</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Convert" button to process all files
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="font-semibold mb-2">Download Results</h3>
                <p className="text-sm text-muted-foreground">
                  Files auto-download or click to re-download
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
