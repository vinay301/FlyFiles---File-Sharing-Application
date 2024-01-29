"use client"
import React, { useState } from 'react'
import { File, Shield, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
const SideNav = () => {
    const menuList = [
        {
            id:1,
            name:"Upload",
            path:'/upload',
            icon:Upload
        },
        {
            id:2,
            name:"Files",
            path:'/files',
            icon:File
        },
        {
            id:1,
            name:"Upload",
            path:'/upgrade',
            icon:Shield
        },
    ]

const [activeIndex, setActiveIndex] = useState(0);    
  return (
    <div className='shadow-sm border-r h-full'>
        <div className='p-5 border-b'>
            <Image src='logo.svg' width={50} height={50} alt='logo'/>
        </div>

        <div className='flex flex-col float-left w-full'>
          
            {menuList.map((item,index) => (
                <Link href={item.path}>
                    <button className={`flex gap-2 p-4 px-6 hover:bg-gray-100 w-full text-primary ${activeIndex==index?'bg-blue-200 text-primary' :null }`}
                        onClick={()=>setActiveIndex(index)}
                    >
                        <item.icon/>
                        <h2>{item.name}</h2>
                    </button>
                </Link>
               
            ))}
        </div>
        
    </div>
  )
}

export default SideNav