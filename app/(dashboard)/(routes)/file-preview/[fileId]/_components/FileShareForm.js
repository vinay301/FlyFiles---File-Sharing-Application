import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import { Copy } from 'lucide-react';
import React, { useState } from 'react'

function FileShareForm({file, onPasswordSave}) {
    const [isPasswordEnable, setIsPasswordEnable] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const {user}=useUser();

    const sendEmail = () => {
      const data={
        emailToSend:email,
        UserName:user.fullName,
        fileName:file.fileName,
        fileSize:file.fileSize,
        fileType:file.fileType,
        shortUrl:file.shortUrl,
      }
      GlobalApi.SendEmail(data).then(resp=> {
            console.log(resp);

      })
      fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
    }

    const onCopyClick = () => {
      navigator.clipboard.writeText(file.shortUrl);
    }

  return file && (
    <div className='flex flex-col gap-2'>
        <div>
           <label className='text-[14px] text-gray-500'>Short Url</label>
           <div className='flex gap-5 p-2 border rounded-md justify-between'>
              <input type="text" value={file.shortUrl} disabled
               className='disabled: bg-transparent outline-none w-full'
              />
              <Copy className='text-gray-500 hover:text-gray-400 cursor-pointer' onClick={()=>onCopyClick()}/>

        </div>
        <div className='gap-3 flex mt-5'>
          <input type='checkbox' onChange={(e)=>setIsPasswordEnable(e.target.value)}/>
          <label className='text-gray-500'>Enable Password</label>
        </div>
        {isPasswordEnable?
        <div className='flex gap-3 items-center'>
        <div className='border rounded-md w-full p-2'>
           <input type='password'
             className='disabled:text-gray-500  outline-none w-full'
              placeholder='Enter Password'
              onChange={(e)=>setPassword(e.target.value)}
           />
        </div>
        <button className='bg-primary text-white-400 rounded-md p-2 hover:bg-blue-600 text-white'
          disabled={password.length<6}
          onClick={()=>onPasswordSave(password)}
          >Save</button>
        </div>:null}

        <>
          <div className='flex gap-3 items-center mt-3'>
            <div className='border rounded-md w-full p-2'>
              <input
                type='text'
                className='disabled:text-gray-500 bg-transparent outline-none w-full'
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='flex gap-3 items-center mt-3'>
            <button
              className='bg-primary text-white-400 rounded-md p-2 hover:bg-blue-600 text-white'
              onClick={() =>sendEmail()}
              //disabled={!email}
            >
              Send Email
            </button>
          </div>
        </> 
      </div> 
    </div>
  );
} // Add closing parenthesis here

export default FileShareForm

