import Appbar from '@/components/ui/Appbar'
import Balance from '@/components/ui/Balance'
import Users from '@/components/ui/Users'
import React from 'react'

const Dashboard = () => {
  return (
    <>
      <Appbar />
      <Balance />
      <Users />
    </>
  )
}

export default Dashboard