import { ICONS } from '@/lib/constants/assets/icons'
import { SIDEBAR } from '@/lib/constants/sidebarNav'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'


const SidebarNav = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const pathname = usePathname();
  return (
    <div>
      {SIDEBAR &&
        SIDEBAR.map((item, index) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          return (
            <React.Fragment key={index}>
            <div className={`px-[14px] flex items-center h-[48px] rounded-[16px] justify-between ${pathname === item.href ? 'bg-grey-100' : 'hover:bg-grey-100'}`}>
            <div className={`flex items-center gap-[14px] `}>
              <Link key={index} href={item.href}>
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={20}
                  height={20}
                  className='w-[20px] h-[20px]'
                />
              </Link>
              <Link href={item.href}>
                <span className='text-[14px] font-normal text-grey-800'>{item.title}</span>
              </Link>
            </div>
            <div>
              {hasSubItems &&
                <div>
                  <Image src={ICONS.arrowdown.src}
                    alt={ICONS.arrowdown.alt}
                    width={20}
                    height={20}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className={`cursor-pointer duration-300 ${openIndex===index ? 'rotate-180' : ''}`} />
                </div>
              }
            </div>
          </div>
          {hasSubItems && openIndex === index && (
            <div className='relative '>
              {item.subItems.length >1 && (
                <div className='absolute left-[20.5px] top-[12px] bottom-[12px] border-l  border-dashed border-grey-400 z-10'></div>
              )}
              {item.subItems.map((subItem, subIndex) => (
                <Link key={subIndex} href={subItem.href}>
                  <div className={`my-[7px] pl-[18px] flex items-center gap-[18px] h-[20px] rounded-[10px] hover:bg-grey-100 ${pathname === subItem.href ? 'bg-grey-100' : ''}`}>
                    <div className={`z-30 w-[6px] h-[6px] rounded-full ${subItem.color}  ${subItem.shadow}`}></div>
                    <span className='text-[12px] font-normal text-black'>{subItem.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          )
}
          </React.Fragment>
          )
})}
    </div>
  )
}

export default SidebarNav