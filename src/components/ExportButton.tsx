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
      
      // Canadian color scheme
      const canadianRed = [255, 0, 0];
      const canadianBlue = [0, 82, 147];
      const darkGray = [40, 40, 40];
      const lightGray = [100, 100, 100];
      const accentGold = [255, 196, 37];
      
      // Beautiful header with Canadian flag colors
      pdf.setFillColor(canadianRed[0], canadianRed[1], canadianRed[2]);
      pdf.rect(0, 0, pageWidth, 15, 'F');
      
      // White stripe
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 15, pageWidth, 25, 'F');
      
      // Add maple leaf symbol (using unicode)
      pdf.setFontSize(24);
      pdf.setTextColor(canadianRed[0], canadianRed[1], canadianRed[2]);
      pdf.text('🍁', 20, 32);
      
      // Title with gradient-like effect
      pdf.setFontSize(24);
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(title, 35, 32);
      
      // Subtitle line
      pdf.setFontSize(12);
      pdf.setTextColor(canadianBlue[0], canadianBlue[1], canadianBlue[2]);
      pdf.text('Canadian Cost of Living Analyzer', 35, 37);
      
      // Decorative line
      pdf.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
      pdf.setLineWidth(1);
      pdf.line(20, 45, pageWidth - 20, 45);
      
      // Timestamp with styled background
      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(pageWidth - 80, 47, 60, 8, 2, 2, 'F');
      pdf.setFontSize(9);
      pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
      pdf.text(`Generated: ${new Date().toLocaleDateString('en-CA')}`, pageWidth - 77, 52);
      
      let yPosition = 65;

      if (elementId) {
        // Add section header
        pdf.setFontSize(16);
        pdf.setTextColor(canadianBlue[0], canadianBlue[1], canadianBlue[2]);
        pdf.text('Analysis Results', 20, yPosition);
        yPosition += 10;
        
        // Decorative underline
        pdf.setDrawColor(canadianRed[0], canadianRed[1], canadianRed[2]);
        pdf.setLineWidth(0.5);
        pdf.line(20, yPosition, 80, yPosition);
        yPosition += 10;
        
        // Export specific element as image with enhanced styling
        const element = document.getElementById(elementId);
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: element.scrollWidth,
            height: element.scrollHeight
          });
          
          const imgData = canvas.toDataURL('image/png', 0.95);
          const maxWidth = pageWidth - 40;
          const imgWidth = Math.min(maxWidth, canvas.width / 2);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add subtle shadow effect
          pdf.setFillColor(200, 200, 200);
          pdf.roundedRect(22, yPosition + 2, imgWidth, imgHeight, 3, 3, 'F');
          
          // Check if image fits on current page
          if (yPosition + imgHeight > pageHeight - 30) {
            pdf.addPage();
            // Add header to new page
            pdf.setFontSize(10);
            pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
            pdf.text(`${title} - Continued`, 20, 15);
            pdf.line(20, 18, pageWidth - 20, 18);
            yPosition = 25;
            
            // Re-add shadow for new page
            pdf.setFillColor(200, 200, 200);
            pdf.roundedRect(22, yPosition + 2, imgWidth, imgHeight, 3, 3, 'F');
          }
          
          // Add the image with border
          pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
          
          // Add border around image
          pdf.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
          pdf.setLineWidth(0.2);
          pdf.rect(20, yPosition, imgWidth, imgHeight);
          
          yPosition += imgHeight + 15;
        }
      }

      if (data) {
        // Add data section header
        pdf.setFontSize(16);
        pdf.setTextColor(canadianBlue[0], canadianBlue[1], canadianBlue[2]);
        pdf.text('Detailed Data', 20, yPosition);
        yPosition += 10;
        
        // Decorative underline
        pdf.setDrawColor(canadianRed[0], canadianRed[1], canadianRed[2]);
        pdf.setLineWidth(0.5);
        pdf.line(20, yPosition, 75, yPosition);
        yPosition += 15;
        
        // Add data in a beautiful format
        pdf.setFontSize(11);
        pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        
        if (typeof data === 'object') {
          // Format object data in a table-like structure
          const formatObjectData = (obj: any, indent = 0) => {
            const indentStr = '  '.repeat(indent);
            Object.entries(obj).forEach(([key, value]) => {
              if (yPosition > pageHeight - 25) {
                pdf.addPage();
                // Add continuation header
                pdf.setFontSize(10);
                pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
                pdf.text(`${title} - Data Continued`, 20, 15);
                pdf.line(20, 18, pageWidth - 20, 18);
                yPosition = 25;
                pdf.setFontSize(11);
                pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
              }
              
              if (typeof value === 'object' && value !== null) {
                // Key header with background
                pdf.setFillColor(248, 249, 250);
                pdf.rect(20 + indent * 5, yPosition - 3, pageWidth - 40 - indent * 5, 6, 'F');
                pdf.setTextColor(canadianBlue[0], canadianBlue[1], canadianBlue[2]);
                pdf.text(`${indentStr}${key}:`, 22 + indent * 5, yPosition);
                yPosition += 8;
                formatObjectData(value, indent + 1);
              } else {
                // Key-value pair
                pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
                const keyText = `${indentStr}${key}:`;
                const valueText = String(value);
                pdf.text(keyText, 22 + indent * 5, yPosition);
                pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
                pdf.text(valueText, 80 + indent * 5, yPosition);
                yPosition += 6;
              }
            });
          };
          
          formatObjectData(data);
        } else {
          // Handle string data with better formatting
          const lines = pdf.splitTextToSize(data.toString(), pageWidth - 40);
          lines.forEach((line: string) => {
            if (yPosition > pageHeight - 25) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(line, 20, yPosition);
            yPosition += 6;
          });
        }
      }

      // Beautiful footer on all pages
      const addFooter = (pageNum: number, totalPages: number) => {
        const footerY = pageHeight - 15;
        
        // Footer background
        pdf.setFillColor(248, 249, 250);
        pdf.rect(0, footerY - 5, pageWidth, 20, 'F');
        
        // Footer line
        pdf.setDrawColor(accentGold[0], accentGold[1], accentGold[2]);
        pdf.setLineWidth(0.5);
        pdf.line(20, footerY - 2, pageWidth - 20, footerY - 2);
        
        // Footer text
        pdf.setFontSize(8);
        pdf.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
        pdf.text('🍁 Canadian Cost of Living Analyzer', 20, footerY + 2);
        pdf.text('Powered by Lovable.dev', 20, footerY + 6);
        
        // Page numbers
        pdf.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 40, footerY + 2);
        
        // Website
        pdf.setTextColor(canadianBlue[0], canadianBlue[1], canadianBlue[2]);
        pdf.text('lovable.dev', pageWidth - 40, footerY + 6);
      };
      
      // Add footer to all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addFooter(i, totalPages);
      }
      
      // Save the PDF
      pdf.save(`${filename}.pdf`);
      
      toast({
        title: "🎉 Export Successful",
        description: "Your beautiful Canadian cost analysis report has been downloaded!",
      });
      
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "❌ Export Failed",
        description: "Unable to generate your PDF report. Please try again.",
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