'use client';

import { FileType, SUPPORTED_FORMATS } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface FormatSelectorProps {
  inputFormat: FileType;
  outputFormat: FileType;
  onInputChange: (format: FileType) => void;
  onOutputChange: (format: FileType) => void;
  disabled?: boolean;
}

export default function FormatSelector({
  inputFormat,
  outputFormat,
  onInputChange,
  onOutputChange,
  disabled = false,
}: FormatSelectorProps) {
  const formats = Object.keys(SUPPORTED_FORMATS) as FileType[];

  return (
    <Card className="border-green-100 bg-gradient-to-br from-white to-green-50/30">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* From Format */}
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Convert From
            </label>
            <Select
              value={inputFormat}
              onValueChange={(value) => onInputChange(value as FileType)}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {SUPPORTED_FORMATS[format].name} (.{format.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow - Down on mobile, Right on desktop */}
          <div className="flex items-center justify-center pt-0 sm:pt-7">
            <ArrowDown className="w-6 h-6 text-primary sm:hidden" />
            <ArrowRight className="hidden w-6 h-6 text-primary sm:block" />
          </div>

          {/* To Format */}
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Convert To
            </label>
            <Select
              value={outputFormat}
              onValueChange={(value) => onOutputChange(value as FileType)}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {SUPPORTED_FORMATS[format].name} (.{format.toUpperCase()})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
