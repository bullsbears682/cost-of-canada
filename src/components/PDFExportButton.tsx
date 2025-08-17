import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { PDFExportService, ExportData } from '@/services/PDFExportService';
import { FileDown, Loader2 } from 'lucide-react';

interface PDFExportButtonProps {
  data?: ExportData;
  calculationType?: string;
  calculationName?: string;
  parameters?: Record<string, any>;
  results?: Record<string, any>;
  elementId?: string;
  filename?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const PDFExportButton: React.FC<PDFExportButtonProps> = ({
  data,
  calculationType,
  calculationName,
  parameters,
  results,
  elementId,
  filename,
  title,
  subtitle,
  variant = 'default',
  size = 'sm',
  className = '',
  children
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Get user info if available
      const userInfo = user ? {
        name: user.user_metadata?.display_name || user.email,
        email: user.email,
        location: user.user_metadata?.location
      } : undefined;

      if (data) {
        // Export using provided data
        await PDFExportService.exportToPDF(data, filename);
      } else if (calculationType && calculationName && parameters && results) {
        // Export calculation results
        await PDFExportService.exportCalculation(
          calculationType,
          calculationName,
          parameters,
          results,
          userInfo
        );
      } else if (elementId && title) {
        // Export HTML element
        const exportFilename = filename || `${title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        await PDFExportService.exportElementToPDF(elementId, exportFilename, title, subtitle);
      } else {
        throw new Error('Invalid export configuration');
      }

      toast({
        title: "PDF Generated!",
        description: "Your report has been downloaded successfully.",
      });

    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          {children || 'Export PDF'}
        </>
      )}
    </Button>
  );
};

export default PDFExportButton;