'use client';

import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Button from './Button';

interface ExportPdfButtonProps {
    targetRef: React.RefObject<HTMLDivElement>;
  }

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ targetRef }) => {
  const exportPdf = async () => {
    const element = targetRef.current;
    if (!element) {
      console.error("Element not found:", targetRef);
      return;
    }
    try {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mx',
          format: 'a4',
        });
    
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

    // Optionally add a header
    pdf.setFontSize(18);
    pdf.text("Admin Report", pdfWidth / 2, 30, { align: "center" });
    
    // Calculate image dimensions to fit on the page
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    // Add the captured image starting a bit below the header
    pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight);
    
    // Optionally add a footer
    pdf.setFontSize(12);
    pdf.text("Generated on " + new Date().toLocaleDateString(), pdfWidth / 2, pdfHeight - 20, { align: "center" });
    
    pdf.save("admin-report.pdf");
  };

  return (
    <div className="flex justify-end">
      <Button
        onClick={exportPdf}
        label="Export as PDF"
        className="px-4 py-2 text-white"
      />
    </div>
  );
};

export default ExportPdfButton;
