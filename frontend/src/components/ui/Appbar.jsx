import React from 'react'
import { Button } from './button'
import { useNavigate } from 'react-router-dom';

const Appbar = () => {

    const navigate = useNavigate();

    const loginStatus = (localStorage.getItem('token'));

    const clickHandler = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }




    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 font-bold">
                PayTM App
            </div>
            <div className="flex font-semibold">
                <div className="flex flex-col justify-center h-full mr-4">
                    {loginStatus && (
                        <Button onClick={clickHandler} variant="destructive">Logout</Button>
                    )}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div onClick={()=> navigate('/update-profile')} className="flex flex-col justify-center h-full text-xl cursor-pointer">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar