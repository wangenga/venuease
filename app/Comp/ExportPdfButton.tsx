'use client';

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from './Button';

interface ExportPdfButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ targetRef }) => {
  const handleDownloadPdf = async () => {
    const element = targetRef.current;
    if (!element) {
      console.error("Report element not found");
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save('listings-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <Button
      onClick={handleDownloadPdf}
      label="Export to PDF"
      className="px-4 py-2"
    />
  );
};

export default ExportPdfButton;