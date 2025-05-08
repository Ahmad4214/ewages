"use client";
import { useStateContext } from '@/app/context/SidebarContext'
import { ICONS } from '@/lib/constants/assets/icons'
import { IMAGES } from '@/lib/constants/assets/images'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  const { isSidebarOpen , setIsSidebarOpen } = useStateContext();
  return (
    <div className='w-[100%] h-[72px] z-30 sticky top-0 shadow-md bg-grey-50 sm:px-[28px] max-sm:pr-5 flex items-center justify-between'>
      {/* Left */}
      <div className='flex items-center gap-[8px]'>
        <Image onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} src={ICONS.toggle.src} alt={ICONS.toggle.alt} width={20} height={20} className='m-[2px] w-[20px] min-w-fit cursor-pointer' />
        <p className='text-[14px] leading-[20px] font-[400] md:block hidden'>Admin Portal</p>
        <div className='lg:block hidden'>
          <div className=' bg-[#EEEEEE] cursor-pointer flex gap-[8px] px-[8px] rounded-lg items-center '>
            <Image src={ICONS.lang.src} alt={ICONS.lang.alt} width={20} height={20} className='m-[2px] ' />
            <span className='font-[400] text-[14px]'>English</span>
            <Image src={ICONS.arrowdown.src} alt={ICONS.arrowdown.alt} width={20} height={20} className='m-[2px]' />
          </div>
        </div>
      </div>
      {/* right */}
      <div className='flex items-center gap-[20px]'>
        <div className='flex items-center gap-[14px]'>
          <div className='md:block hidden'>
            <div className='flex gap-[8px] '>
              <Image src={ICONS.sun.src} alt={ICONS.sun.alt} width={20} height={20} className='m-[2px] cursor-pointer' />
              <Image src={ICONS.bell.src} alt={ICONS.bell.alt} width={20} height={20} className='m-[2px] cursor-pointer' />
              <Image src={ICONS.window.src} alt={ICONS.window.alt} width={20} height={20} className='m-[2px] cursor-pointer' />
            </div>
          </div>
          {/* user */}
          <div className='flex items-center max-sm:pl-[20px] gap-[10px]'>
            <Image src={IMAGES.avatar.src} alt={IMAGES.avatar.alt} width={32} height={32} className='m-[2px] cursor-pointer w-[32px]' />
            <span className='text-grey-700 text-[14px]'>Username</span>
          </div>
        </div>
        {/* setting */}
        <div className='lg:block hidden'>
          <Image src={ICONS.setting.src} alt={ICONS.setting.alt} width={20} height={20} className='m-[2px] cursor-pointer' />

        </div>
      </div>
    </div>
  )
}

export default Navbar