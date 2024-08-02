import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, linkLabel, to}) => {
  return (
    <div className='flex justify-center gap-2 pb-6 text-md font-medium text-slate-950'>
        <div>{label}</div>
        <Link className='underline' to={to}>{linkLabel}</Link>
    </div>
  )
}

export default BottomWarning