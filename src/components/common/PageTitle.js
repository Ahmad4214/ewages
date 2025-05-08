"use client"
import React, { useEffect, useState } from 'react'

const PageTitle = ({title , time}) => {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const formatDate = ()=>{
      const date =  new Date();
      const options = {weekday: "long"};

      const day = date.toLocaleDateString("en-US", options);
      const dateD = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${day} ${dateD}-${month}-${year}`;
      setCurrentDate(formattedDate);
      
    }
    formatDate();
  
    
  }, [])
  
  return (
    <div className='h-auto box-border flex sm:flex-row flex-col items-center justify-between sm:pl-[58px] pt-[38] sm:pr-[41px] '>
      <h1 className='font-[700] text-[20px] text-grey-800'>{title}</h1>
      {time === "true" && <p className='font-[400] text-[16px] text-grey-800'>Today is {currentDate}</p>}
    </div>
    
  )
}

export default PageTitle