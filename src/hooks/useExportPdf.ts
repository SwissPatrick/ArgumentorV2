
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

export function useExportPdf() {
    const [isExporting, setIsExporting] = useState(false);

    const getTypeLabel = (type: string): string => {
        switch (type) {
            case "premise":
                return "Premise";
            case "conclusion":
                return "Conclusion";
            case "evidence":
                return "Evidence";
            case "objection":
                return "Objection";
            case "rebuttal":
                return "Rebuttal";
            default:
                return type.charAt(0).toUpperCase() + type.slice(1);
        }
    };

    const getTypeColor = (type: string): string => {
        switch (type) {
            case "premise":
                return "#8B5CF6"; // Purple
            case "conclusion":
                return "#0EA5E9"; // Blue
            case "evidence":
                return "#10B981"; // Green
            case "objection":
                return "#F97316"; // Orange
            case "rebuttal":
                return "#EF4444"; // Red
            default:
                return "#6B7280"; // Gray
        }
    };

    const exportToPdf = async (title: string, argumentBlocks: ArgumentItem[]) => {
        if (argumentBlocks.length === 0) {
            toast({
                title: "Nothing to export",
                description: "Please add at least one block to your argument",
                variant: "destructive",
            });
            return;
        }

        setIsExporting(true);

        try {
            // Create a temporary div to render our content for PDF
            const tempDiv = document.createElement("div");
            tempDiv.className = "pdf-export-container";
            tempDiv.style.width = "700px";
            tempDiv.style.padding = "40px";
            tempDiv.style.fontFamily = "Arial, sans-serif";
            tempDiv.style.position = "absolute";
            tempDiv.style.left = "-9999px";

            // Add title
            const titleElement = document.createElement("h1");
            titleElement.innerText = title || "Untitled Argument";
            titleElement.style.fontSize = "24px";
            titleElement.style.marginBottom = "20px";
            titleElement.style.color = "#1A1F2C";
            titleElement.style.borderBottom = "2px solid #8B5CF6";
            titleElement.style.paddingBottom = "10px";
            tempDiv.appendChild(titleElement);

            // Add date
            const dateElement = document.createElement("p");
            dateElement.innerText = `Created: ${new Date().toLocaleDateString()}`;
            dateElement.style.fontSize = "12px";
            dateElement.style.marginBottom = "30px";
            dateElement.style.color = "#6B7280";
            tempDiv.appendChild(dateElement);

            // Add blocks
            argumentBlocks.forEach((block, index) => {
                const blockElement = document.createElement("div");
                blockElement.style.marginBottom = "20px";
                blockElement.style.padding = "15px";
                blockElement.style.borderRadius = "8px";
                blockElement.style.backgroundColor = "#F9FAFB";
                blockElement.style.borderLeft = `4px solid ${getTypeColor(block.type)}`;

                const typeElement = document.createElement("div");
                typeElement.innerText = getTypeLabel(block.type);
                typeElement.style.fontSize = "14px";
                typeElement.style.fontWeight = "bold";
                typeElement.style.marginBottom = "8px";
                typeElement.style.color = getTypeColor(block.type);
                blockElement.appendChild(typeElement);

                const contentElement = document.createElement("div");
                contentElement.innerText = block.content;
                contentElement.style.fontSize = "14px";
                contentElement.style.lineHeight = "1.5";
                contentElement.style.color = "#374151";
                blockElement.appendChild(contentElement);

                tempDiv.appendChild(blockElement);
            });

            // Add credits
            const creditsElement = document.createElement("p");
            creditsElement.innerText = "Generated with ArgBuilder";
            creditsElement.style.fontSize = "12px";
            creditsElement.style.marginTop = "30px";
            creditsElement.style.color = "#9CA3AF";
            creditsElement.style.textAlign = "center";
            tempDiv.appendChild(creditsElement);

            document.body.appendChild(tempDiv);

            // Generate PDF
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            });

            const canvas = await html2canvas(tempDiv, {
                scale: 2,
                logging: false,
                useCORS: true,
            });

            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Add more pages if content is longer than one page
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Save the PDF
            pdf.save(`${title || "argument"}.pdf`);

            // Clean up
            document.body.removeChild(tempDiv);

            toast({
                title: "PDF exported successfully",
                description: "Your argument has been exported as a PDF file",
            });
        } catch (error) {
            console.error("Error exporting PDF:", error);
            toast({
                title: "Export failed",
                description: "There was an error exporting your argument to PDF",
                variant: "destructive",
            });
        } finally {
            setIsExporting(false);
        }
    };

    return { exportToPdf, isExporting };
}
