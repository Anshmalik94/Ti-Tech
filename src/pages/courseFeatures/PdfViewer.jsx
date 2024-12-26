import React from 'react';
import './PdfViewer.css'; // Import your CSS file

const PdfViewer = ({ title, pages }) => {

    const downloadPDF = () => {
        // Create an anchor element for downloading the PDF
        const link = document.createElement('a');
        link.href = 'your-pdf-url.pdf'; // Replace with your PDF URL
        link.setAttribute('download', 'Downloaded_PDF.pdf'); // Use a default name for download
        document.body.appendChild(link); // Append the link to the body
        link.click(); // Trigger the download
        document.body.removeChild(link); // Remove the link after downloading
    };

    return (
        <div className="PdfViewer_pdfViewer__uxDeW">
            <h2 className="PdfViewer_title__51LM0">{title}</h2>
            <div className="PdfViewer_pdfViewerWrapper__Ubu8T">
                <div className="ImageModule_DownloadPdfWrapper__OtFm1" id="download-pdf-wrapper">
                    <div className="ImageModule_imageModuleOuterContainer__y_9i_">
                        <div className="ImageModule_imageModuleContainer__67Nxg">
                            <div className="ImageModule_imageModule__3THyc" itemProp="articleSection">
                                <div className="scrollable-pdf">
                                    {pages.map((page, index) => (
                                        <div className="pdf-page" key={index}>
                                            <img 
                                                alt={`PDF page ${index + 1}`} 
                                                src={page} 
                                                className="ImageModule_zoomImgFirst__CFdB_" 
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PdfViewer_buttons">
                        <button className="btn-download-pdf" onClick={downloadPDF}>Download PDF</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
