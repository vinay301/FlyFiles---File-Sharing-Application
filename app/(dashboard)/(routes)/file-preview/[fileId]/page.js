"use client"
import React, { useEffect, useState } from 'react'
import { app } from '@/firebaseConfig'
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';
import { ArrowLeftSquare } from 'lucide-react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';

const FilePreview = ({params}) => {
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const [file,setFile] = useState();
    useEffect(()=>{
       // console.log("File Preview",params?.fileId)
        params?.fileId && getFileInfo();
    }, [])

    const getFileInfo = async() => {
        const docRef = doc(db, "uploadedFiles",params?.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
       // console.log("Document data:", docSnap.data());
        setFile(docSnap.data());
        } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        }
    }

    const onPasswordSave = async(password) => {
        const docRef = doc(db, "uploadedFiles", params?.fileId);
        await updateDoc(docRef,{
          password:password
        });

  }

  return (
    <div className='py-10 px-20'>
    <Link href='/upload' className='flex gap-3'>
          <ArrowLeftSquare/> Go to Upload </Link>
       <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
         <FileInfo file={file}/>
         <FileShareForm file={file}
          onPasswordSave={(password)=>onPasswordSave(password)}
         />
       </div>
    </div>
  );
  
}

export default FilePreview