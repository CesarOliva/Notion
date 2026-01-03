"use client"

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Export = ({ 
  title 
}: { 
  title: string 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById("note-content");
      if (!element) {
        return;
      }

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "210mm"; // Ancho A4
      container.style.padding = "15mm";
      container.style.backgroundColor = "white";
      container.style.boxSizing = "border-box";
      container.style.zIndex = "10000";
      
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.width = "100%";
      clone.style.height = "auto";
      clone.style.backgroundColor = "white";
      clone.style.color = "black";
      clone.style.fontSize = "12pt";
      clone.style.lineHeight = "1.6";
      
      const allElements = clone.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.backgroundColor = "transparent";
          el.style.color = "black";
          el.style.boxShadow = "none";
        }
      });
      
      container.appendChild(clone);
      document.body.appendChild(container);

      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${title.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      toast.error("PDF export failed.");
    } finally {
      toast.success("PDF exported successfully!");
      setIsExporting(false);
    }
  };

  return (
    <Button variant="ghost" onClick={handleExport} disabled={isExporting}>
      {isExporting ? "Exporting..." : "Export as PDF"} 
      <Download className="h-4 w-4" />
    </Button>
  );
};

export default Export;