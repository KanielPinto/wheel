// components/UploadForm.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/router';

const UploadForm = () => {
//   const router = useRouter();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`http://localhost:5000/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // router.push('/success'); // Redirect to a success page
      } else {
        console.error('Failed to upload PDF');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="pdf" accept=".pdf" onChange={handleFileChange} /><br /><br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default UploadForm;
