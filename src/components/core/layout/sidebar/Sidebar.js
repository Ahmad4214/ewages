"use client";
import { useStateContext } from '@/app/context/SidebarContext';
import { LOGOS } from '@/lib/constants/assets/logos';
import Image from 'next/image';
import React from 'react'
import SidebarNav from './sidebarNav/SidebarNav';
import Link from 'next/link';

const Sidebar = () => {
  const { isSidebarOpen , setIsSidebarOpen } = useStateContext();
  return (
    <div className={
      ` ease-in-out duration-300 transition-all md:relative absolute z-50 min-h-[100vh] overflow-y-auto border-r-[1px] bg-grey-50 border-grey-300 
     ${isSidebarOpen ? "w-0" : 'w-[276px] min-w-fit'}
     `}>
      <div className='flex items-center justify-center h-[72px] border-b-[1px] border-grey-300 mx-[16px] border-dashed'>
        <Link href={"/"}>
          <Image src={LOGOS.logo.src}
            alt={LOGOS.logo.alt}
            width={1000}
            height={1000}
            className='cursor-pointer w-[155px] h-[30px]'
            priority/>
        </Link>
        {
          !isSidebarOpen &&
          <div className='ml-8 md:hidden block'>
            <button onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}}>X</button>
          </div>
        }
      </div>
      {/* Sidebar items */}
      <div className='mt-[20px] mx-[16px]'>
        <SidebarNav />
      </div>

    </div>
  )
}

export default Sidebar