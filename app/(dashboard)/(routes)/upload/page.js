"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { app } from '@/firebaseConfig'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '@/app/_utils/GenerateRandomString';
import { useRouter } from 'next/navigation';
import CompletedCheck from './_components/CompletedCheck';

const Upload = () => {
  const {user} = useUser();
  const [progress, setProgress] = useState()
  const [uploadCompleted,setUploadCompleted] = useState(false)
  const [fileDocId, setFileDocId] = useState();
  const router = useRouter();
  //get storage instance
  const storage = getStorage(app)
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  
  const uploadFile = (file) => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type
    };
    // Child references can also take paths delimited by '/'
    const storageRef = ref(storage, 'file-upload/'+file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file, file.type);

    // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');

      // Upload completed successfully, now we can get the download URL
      setProgress(progress);
      progress==100 &&  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        saveInfo(file,downloadURL);
      });
  }, )
  }

  const saveInfo = async(file,fileUrl) =>{
    // Add a new document in collection "uploadedFiles"
    const docId = generateRandomString().toString();
    await setDoc(doc(db, "uploadedFiles",docId), {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      fileUrl : fileUrl,
      userEmail : user?.primaryEmailAddress.emailAddress,
      userName : user?.fullName,
      password : '',
      id : docId,
      shortUrl : process.env.NEXT_PUBLIC_BASE_URL+docId
});
  setFileDocId(docId);
  }

  useEffect(()=>{
    console.log("Trigger")
    progress == 100&& setTimeout(()=>{
      setUploadCompleted(true);
    },2000);
  }, [progress==100]);

  useEffect(()=>{
    uploadCompleted && 
    setTimeout(() => {
      setUploadCompleted(false);
      router.push('/file-preview/' + fileDocId);
    },2000);
  }, [uploadCompleted==true]);



  return (
    <div className='p-5 px-8 md:px-28 text-center'>
      {!uploadCompleted?<div>
      <h2 className='text-[20px] text-center m-5'>Start  
        <strong className="text-primary"> Uploading</strong> File &
        <strong className="text-primary"> Share</strong> It.
      </h2>
      <UploadForm uploadBtnClick={(file)=>uploadFile(file)}
      progress={progress}/>
      </div>:
      <CompletedCheck/> }
    </div>
  )
}

export default Upload 