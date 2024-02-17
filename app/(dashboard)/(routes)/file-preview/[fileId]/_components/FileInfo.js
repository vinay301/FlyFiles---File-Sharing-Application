import Image from 'next/image';
import React, { useEffect, useState } from 'react';

function FileInfo({ file }) {
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (file) {
      setFileType(file.fileType.split('/')[0]);
    }
  }, [file]);

  const getImageSource = () => {
    if (fileType === 'image') {
      return file.fileUrl;
    }
    return '/file.png';
  };

  return file && (
    <div className='text-center border flex justify-center m-4 flex-col items-center p-2 rounded border-blue-200 hover:border-purple-500'>
      <Image
        src={fileType==='image'?file?.fileUrl:'/file.png'}
        alt={file.fileName}
        width={200}
        height={200}
        className='h-[200px] rounded-md object-contain'
      />
      <div className=''>
        <h2 className='text-sky-300'>{file.fileName}</h2>
        <h2 className='text-gray-400 text-[13px]'>{file.fileType}</h2>
      </div>
    </div>
  );
}

export default FileInfo;