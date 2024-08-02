import React from 'react'

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
import { Link } from 'react-router-dom'
import BottomWarning from '@/components/ui/BottomWarning'

const Signup = () => {
    return (
        <div className='h-screen bg-black bg-opacity-50'>
            <div className="flex justify-center items-center">
                <Card className="w-[350px] mt-16">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Enter your information to create your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="john@gmail.com" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Button type="submit">Sign Up</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <BottomWarning label="Already have an account?" linkLabel="Login" to="/signin"></BottomWarning>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Signup