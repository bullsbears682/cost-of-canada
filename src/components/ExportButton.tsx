import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  data?: any;
  elementId?: string;
  filename?: string;
  title?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  elementId,
  filename = 'cost-analysis-report',
  title = 'Cost Analysis Report',
  variant = 'outline',
  size = 'sm',
  className
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToPDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add header
      pdf.setFontSize(20);
      pdf.setTextColor(40, 40, 40);
      pdf.text(title, 20, 25);
      
      // Add timestamp
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${new Date().toLocaleString('en-CA')}`, 20, 35);
      
      let yPosition = 50;

      if (elementId) {
        // Export specific element as image
        const element = document.getElementById(elementId);
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 40;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Check if image fits on current page
          if (yPosition + imgHeight > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          
          pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 10;
        }
      }

      if (data) {
        // Add data as text
        pdf.setFontSize(12);
        pdf.setTextColor(40, 40, 40);
        
        if (typeof data === 'object') {
          const dataString = JSON.stringify(data, null, 2);
          const lines = pdf.splitTextToSize(dataString, pageWidth - 40);
          
          lines.forEach((line: string) => {
            if (yPosition > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(line, 20, yPosition);
            yPosition += 5;
          });
        } else {
          const lines = pdf.splitTextToSize(data.toString(), pageWidth - 40);
          lines.forEach((line: string) => {
            if (yPosition > pageHeight - 20) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(line, 20, yPosition);
            yPosition += 5;
          });
        }
      }

      // Add footer
      const footerY = pageHeight - 10;
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Canadian Cost of Living Analyzer - lovable.dev', 20, footerY);
      
      // Save the PDF
      pdf.save(`${filename}.pdf`);
      
      toast({
        title: "Export Successful",
        description: "Your report has been downloaded as a PDF.",
      });
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={exportToPDF}
      disabled={isExporting}
      className={`gap-2 ${className || ''}`}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exporting...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
};

export default ExportButton;