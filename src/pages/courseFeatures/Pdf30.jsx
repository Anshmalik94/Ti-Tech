import React from 'react';
import PdfViewer from './PdfViewer'; 

const Software = () => {
    const mathPages = [
        `${process.env.PUBLIC_URL}/pdf/sc4.jpg`,
        `${process.env.PUBLIC_URL}/pdf/sc1.jpg`,
        `${process.env.PUBLIC_URL}/pdf/sc2.jpg`,
        `${process.env.PUBLIC_URL}/pdf/sc3.jpg`,
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Our Software Course's</h1>
            <PdfViewer 
                title="Download PDF of NCERT Solutions for Class 10 Maths"
                pages={mathPages}
                pdfUrl={`${process.env.PUBLIC_URL}/pdf/sample_math.pdf`}
                fileName="NCERT_Solutions_Class_10_Maths.pdf"
            />
        </div>
    );
};

export default Software;
