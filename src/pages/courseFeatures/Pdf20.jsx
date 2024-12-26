import React from 'react';
import PdfViewer from './PdfViewer'; 

const Science = () => {
    const mathPages = [
        `${process.env.PUBLIC_URL}/pdf/scs1.jpg`,
        `${process.env.PUBLIC_URL}/pdf/scs3.jpeg`,
        `${process.env.PUBLIC_URL}/pdf/scs4.jpg`,
        `${process.env.PUBLIC_URL}/pdf/scs4.jpg`,
        
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>12th Class Pdf</h1>
            <PdfViewer 
                title="Download PDF of NCERT Solutions for Class 10 Maths"
                pages={mathPages}
                pdfUrl={`${process.env.PUBLIC_URL}/pdf/sample_math.pdf`}
                fileName="NCERT_Solutions_Class_10_Maths.pdf"
            />
        </div>
    );
};

export default Science;
