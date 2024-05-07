import { Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

function Fileuploader({ file, setFile }) {

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1 className='flex items-center gap-2'>
        <Typography> Select a file to upload </Typography> <FaUpload />
      </h1>

      <div
        {...getRootProps()}
        className={`border border-dashed border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center space-y-4 ${file ? 'file-selected' : ''}`}
      >
        <input {...getInputProps()} />
        <FaUpload name="cloud_upload" color="blue" />
        {/* {selectedFile && (
        
      )} */}

        {file ?
          <p className="text-gray-600">{file?.name}</p>
          :
          <p className="text-gray-600">
            Drag & drop files here, or click to select files
          </p>
        }
      </div>
    </div>
  );
}

export default Fileuploader;
