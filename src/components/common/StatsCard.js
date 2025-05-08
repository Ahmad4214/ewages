import Image from 'next/image'
import React from 'react'

const StatsCard = ({
  count,
  color,
  icon,
  alt,
  text }) => {
  return (
    <div className='bg-grey-50 rounded-2xl py-[24px] pl-[24px] flex gap-[12px] items-center'>
      <div className={`rounded-[4px] ${color}`}>
        <div className='p-[10px]'>
          <Image src={icon} alt={alt} width={24} height={24} className='' />
        </div>
      </div>
      <div className='flex flex-col'>
        <div>
          <h1 className='text-grey-800 font-[700] text-[24px]' >{count}</h1>
        </div>
        <div>
          <p className='text-grey-700 font-[400] text-[12px]'>
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsCard