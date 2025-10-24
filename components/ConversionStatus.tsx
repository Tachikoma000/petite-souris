'use client';

import { ConversionStatus as Status } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Loader2, XCircle, FileText } from 'lucide-react';

interface ConversionStatusProps {
  status: Status;
  error?: string;
  fileName?: string;
}

export default function ConversionStatus({ status, error, fileName }: ConversionStatusProps) {
  if (status === 'idle') {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Ready to convert your file</p>
      </div>
    );
  }

  if (status === 'uploading') {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <Progress value={50} className="w-full max-w-xs" />
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <p className="text-sm text-foreground">Uploading {fileName}...</p>
        </div>
      </div>
    );
  }

  if (status === 'converting') {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-foreground font-medium">Converting {fileName}...</p>
          <p className="text-sm text-muted-foreground">This may take 10-30 seconds</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
        <AlertDescription className="flex flex-col gap-2 ml-2">
          <p className="font-medium text-green-900 dark:text-green-100">Conversion complete!</p>
          <p className="text-sm text-green-700 dark:text-green-300">Your file has been downloaded</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'error') {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertDescription className="flex flex-col gap-2 ml-2">
          <p className="font-medium">Conversion failed</p>
          <p className="text-sm">{error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
