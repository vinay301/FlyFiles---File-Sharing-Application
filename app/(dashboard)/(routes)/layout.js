import React from 'react'
import SideNav from '../_components/SideNav'
import TopHeader from '../_components/TopHeader'

const layout = ({children}) => {
  return (
    <div>
        {/* Only that childeren part will change i.e. files/upload will change */}
        <div className='hidden h-full w-64 flex-col md:flex fixed inset-y-0 z-50'>
            <SideNav />
        </div>
        <div className='md:ml-64'>
            <TopHeader/>
            {children}
        </div>
       
      
    </div>
  )
}

export default layout