import React, { useEffect, useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '@/util/baseURL'

const Users = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        axios.get(`${baseURL}/api/v1/user/bulk?filter=${filter}`, config).then(response => setUsers(response?.data));
    }, [filter]);


    return (
        <>
            <div className="text-lg font-semibold ml-4 mb-3">Users</div>
            <div className="ml-4 mr-4">
                <Input 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search users..." />
            </div>
            <div className="flex flex-col gap-4 mt-4">
                {users?.map((user, index) => (
                    <div key={index} className="flex justify-between items-center ml-4 mr-4">
                        <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-full flex justify-center bg-slate-200">
                                <div className="flex flex-col justify-center font-semibold">{user?.firstName[0]}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="text-lg font-semibold flex flex-col justify-center">{user?.firstName}</div>
                                <div className="text-lg font-semibold flex flex-col justify-center">{user?.lastName}</div>
                            </div>
                        </div>

                        <Button onClick={() => navigate(`/send/${user?._id}`)}>Send Money</Button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Users