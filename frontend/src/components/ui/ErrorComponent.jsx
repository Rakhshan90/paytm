import React from 'react'

const ErrorComponent = ({ err }) => {
    return (
        <div className='text-red-500 text-2xl font-bold text-center'>{err}</div>
    )
}

export default ErrorComponent