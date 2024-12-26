import React from 'react';
import PdfViewer from './PdfViewer'; 

const MathSection = () => {
    const mathPages = [
        `${process.env.PUBLIC_URL}/pdf/math1.png`,
        `${process.env.PUBLIC_URL}/pdf/math2.png`,
        `${process.env.PUBLIC_URL}/pdf/math3.png`,
        `${process.env.PUBLIC_URL}/pdf/math4.png`,
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>10th Class Pdf</h1>
            <PdfViewer 
                title="Download PDF of NCERT Solutions for Class 10 Maths"
                pages={mathPages}
                pdfUrl={`${process.env.PUBLIC_URL}/pdf/sample_math.pdf`}
                fileName="NCERT_Solutions_Class_10_Maths.pdf"
            />
        </div>
    );
};

export default MathSection;
