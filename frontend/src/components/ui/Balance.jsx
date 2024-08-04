import { baseURL } from '@/util/baseURL';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Balance = () => {

    const [balance, setBalance] = useState(0);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        const response = axios.get(`${baseURL}/api/v1/account/balance`, config).then((response)=>setBalance(response?.data));
    }, []);

  return (
    <div className='h-14 flex gap-4'>
        <div className="flex flex-col justify-center h-full ml-4 font-semibold">
            Your Balance
        </div>
        <div className="flex flex-col justify-center h-full font-semibold">
            Rs {balance?.balance}
        </div>
    </div>
  )
}

export default Balance