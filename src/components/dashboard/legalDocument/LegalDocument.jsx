import React from "react";
import pdf from "../../../svgs/pdf-icon.svg";
import file1 from "../../../svgs/file1.pdf";
import file2 from "../../../svgs/file2.pdf";
import file3 from "../../../svgs/file3.pdf";
import file4 from "../../../svgs/file4.pdf";
import file5 from "../../../svgs/file5.pdf";
import file6 from "../../../svgs/file6.pdf";
import file7 from "../../../svgs/file7.pdf";
import file8 from "../../../svgs/file8.pdf";
import download from "../../../svgs/download-icon.svg";
import styles from "./LegalDocument.module.scss";
import Layout from "../../Layout";
import BackArrow from "../backArrow/BackArrow";

const LegalDocument = () => {
  // Define an array of file names and their paths
  const files = [
    { name: "Download Caltex Company’s Brief", path: file1 },
    { name: "Download Caltex Company’s Business Plan", path: file2 },
    { name: "Download Caltex Company’s White Paper", path: file3 },
    { name: "Download Caltex Company’s FSA Certification", path: file4 },
    { name: "Download Caltex Company’s CSSF Certification", path: file5 },
    { name: "Download Caltex Company’s FSC Certification", path: file6 },
    { name: "Download Caltex Company’s FSCA Certification", path: file7 },
    { name: "Download Caltex Company’s AFM Certification", path: file8 }
  ];

  // Function to handle file download
  const handleDownload = (filePath, fileName) => {
    // Create a URL for the file using its path
    const fileUrl = filePath;

    // Trigger the download by creating an anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Layout>
      <div className={styles.main_cont}>
        <BackArrow />
        <h2>Legal Documents</h2>
        <p id={styles.p}>
          Have access to our company policy through our legal documents
        </p>
        <ul className={styles.ul_cont}>
          {files.map((file, index) => (
            <li key={index}>
              <img src={pdf} height={32} width={32} alt="pdf" />
              {file.name}
              <img
                src={download}
                width={22}
                height={18}
                alt="download"
                onClick={() => handleDownload(file.path, file.name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default LegalDocument;
