import PageTitle from '@/components/common/PageTitle'
import React from 'react'
import UserTable from './userTable/userTable'

export const User = () => {
  return (
    <div className='h-full'>
      <PageTitle title={"User List"}/>
      <UserTable/>
    </div>
  )
}
