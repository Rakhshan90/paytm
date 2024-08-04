import React, { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import BottomWarning from '@/components/ui/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '@/util/baseURL'
import ErrorComponent from '@/components/ui/ErrorComponent'

const UpdateProfile = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseURL}/api/v1/user/`, { firstName, lastName, password }, config);
            if (response.status === 200) navigate('/');
        } catch (error) {
            setErr(error.response?.data?.message);
        }

    }

    return (
        <div className='h-screen bg-slate-200 bg-opacity-50'>
            <div className="flex justify-center items-center">
                <Card className="w-[350px] mt-16">
                    <CardHeader>
                        {err && (
                            <ErrorComponent err={err} />
                        )}
                        <CardTitle>Update your account</CardTitle>
                        <CardDescription>Enter your information to update your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        id="firstName" placeholder="John" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        id="lastName" placeholder="Doe" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        id="password" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Button type="submit">Update</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UpdateProfile