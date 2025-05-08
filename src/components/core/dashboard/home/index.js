import PageTitle from '@/components/common/PageTitle'
import StatsCard from '@/components/common/StatsCard'
import { employeeStats } from '@/data/EmployeeStats'
import React from 'react'

const Dashboard = () => {
  return (
    <div >
      <PageTitle title="Dashboard" time="true"/>
      <div className='mt-[26px] ml-[24px] mr-[31px] grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-[20px] '>
        {
          employeeStats.map((data , index)=>(
            <div key={index} className=''>
              <StatsCard
            count={data.count}
            color={data.color}
            icon={data.icon}
            alt={data.alt}
            text={data.text}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard