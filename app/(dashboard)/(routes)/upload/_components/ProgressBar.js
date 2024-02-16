import React from 'react'

const ProgressBar = ({progress=40}) => {
  return (
    <div className='bg-gray-400 w-full h-4 mt-3 rounded-full'>
        <div className='h-4 bg-primary rounded-full text-[10px] text-white'
            style={{'width': `${progress}%`}}
        >
            {`${Number(progress).toFixed(0)}%`}
        </div>
    </div>
  )
}

export default ProgressBar