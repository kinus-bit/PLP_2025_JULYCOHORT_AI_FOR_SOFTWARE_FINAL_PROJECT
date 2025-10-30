import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useRef, useState } from "react";
  import html2canvas from "html2canvas";
  import jsPDF from "jspdf";
  
  /**
   * HistoryDetailsModal.jsx
   * - shows detailed AI report
   * - allows "Download PDF" which produces a styled hospital report PDF
   */
  
  export default function HistoryDetailsModal({ entry }) {
    const [downloading, setDownloading] = useState(false);
    const reportRef = useRef();
  
    if (!entry) return null;
  
    const handleDownloadPDF = async () => {
      if (!reportRef.current) return;
      setDownloading(true);
      try {
        // Increase scale for higher quality
        const canvas = await html2canvas(reportRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          // allowTaint: true,
        });
  
        const imgData = canvas.toDataURL("image/png");
  
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        // calculate image dimensions to keep aspect ratio and margins
        const margin = 10; // mm
        const pdfAvailableWidth = pageWidth - margin * 2;
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidthPx = imgProps.width;
        const imgHeightPx = imgProps.height;
        const ratio = imgHeightPx / imgWidthPx;
  
        const imgWidthMm = pdfAvailableWidth;
        const imgHeightMm = imgWidthMm * ratio * (72 / 96); // px->pt->mm conversion approximation
  
        let positionY = margin;
        pdf.addImage(imgData, "PNG", margin, positionY, imgWidthMm, imgHeightMm);
  
        // if content is longer than one page, add pages as needed
        let remainingHeight = imgHeightMm - (pageHeight - margin * 2);
        let srcY = (pageHeight - margin * 2) * (96 / 72); // not strictly necessary but leave for extension
  
        while (remainingHeight > 0) {
          pdf.addPage();
          positionY = margin;
          // draw same image shifted (simple approach: re-add image — for longer content you'd slice canvas)
          pdf.addImage(imgData, "PNG", margin, positionY - (imgHeightMm - remainingHeight), imgWidthMm, imgHeightMm);
          remainingHeight -= (pageHeight - margin * 2);
        }
  
        const safeDate = Date.now();
        pdf.save(`AI_Report_${safeDate}.pdf`);
      } catch (err) {
        console.error("PDF generation error:", err);
        alert("Failed to generate PDF. See console for details.");
      } finally {
        setDownloading(false);
      }
    };
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
        </DialogTrigger>
  
        <DialogContent className="sm:max-w-2xl w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          {/* This section is captured for PDF */}
          <div ref={reportRef} className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header with logo and hospital info */}
            <header className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-4">
                {/* Inline SVG logo */}
                <div className="w-14 h-14 bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20" stroke="#0ea5e9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 8h12M6 16h12" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="8" r="1.2" fill="#0ea5e9" />
                    <circle cx="12" cy="16" r="1.2" fill="#10b981" />
                  </svg>
                </div>
  
                <div>
                  <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">AI Health Clinic</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI Symptom Checker • Demo Medical Report</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">contact: contact@aihealth.example • +1 (555) 0100</p>
                </div>
              </div>
  
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                <div><strong>Report ID:</strong> {entry.id}</div>
                <div><strong>Date:</strong> {entry.date}</div>
              </div>
            </header>
  
            {/* Report body */}
            <main className="space-y-4">
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Patient</h3>
                  <p className="text-base font-medium">{entry.userId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Generated by</h3>
                  <p className="text-base font-medium">AI Symptom Checker</p>
                </div>
              </section>
  
              <section>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Symptoms</h3>
                <p className="text-base mt-1 whitespace-pre-wrap">{entry.symptoms}</p>
              </section>
  
              <section>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Predicted Condition</h3>
                <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-1">{entry.prediction}</p>
              </section>
  
              <section>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">AI Advice</h3>
                <p className="text-base mt-1">{entry.advice}</p>
              </section>
  
              <section className="pt-4 border-t mt-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Disclaimer: This AI-generated report is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding a medical condition.
                </p>
              </section>
            </main>
  
            {/* Signature area */}
            <footer className="mt-8">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-semibold">Attending Physician</p>
                  <p className="text-gray-500 text-sm">Dr. AI Health (placeholder)</p>
                </div>
  
                <div className="text-right">
                  <div className="w-48 h-14 border-b-2 border-gray-300 dark:border-gray-700 mb-2"></div>
                  <p className="text-xs text-gray-500">Signature</p>
                </div>
              </div>
  
              <div className="mt-6 text-xs text-gray-500">
                <div>AI Health Clinic • 123 Demo Street • Demo City</div>
              </div>
            </footer>
          </div>
  
          {/* Dialog footer actions */}
          <DialogFooter className="mt-4 flex justify-between">
            <Button variant="outline">Close</Button>
            <div className="flex gap-2">
              <Button
                onClick={handleDownloadPDF}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={downloading}
              >
                {downloading ? "Preparing PDF..." : "Download PDF"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  