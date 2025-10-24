'use client';

import { FileConversion, SUPPORTED_FORMATS } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, X, Download, Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface FileListProps {
  files: FileConversion[];
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
}

export default function FileList({ files, onRemove, onDownload }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card key={file.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {/* File Icon */}
              <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm">{file.file.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    {file.inputFormat.toUpperCase()}
                  </Badge>
                  <ArrowRight className="w-3 h-3" />
                  <Badge variant="outline" className="text-xs px-1.5 py-0">
                    {file.outputFormat.toUpperCase()}
                  </Badge>
                  <span>•</span>
                  <span>{(file.file.size / 1024).toFixed(1)} KB</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {file.status === 'idle' && (
                  <Badge variant="secondary">Queued</Badge>
                )}
                {file.status === 'uploading' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Uploading...</span>
                  </>
                )}
                {file.status === 'converting' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Converting...</span>
                  </>
                )}
                {file.status === 'success' && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <Button
                      size="sm"
                      onClick={() => onDownload(file.id)}
                      className="h-8"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </>
                )}
                {file.status === 'error' && (
                  <>
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive truncate max-w-[200px]">
                      {file.error || 'Failed'}
                    </span>
                  </>
                )}

                {/* Remove Button */}
                {(file.status === 'idle' || file.status === 'error' || file.status === 'success') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(file.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Error Message */}
            {file.status === 'error' && file.error && (
              <div className="mt-2 text-xs text-destructive bg-destructive/10 rounded p-2">
                {file.error}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
