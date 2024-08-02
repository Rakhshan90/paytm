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


const Signin = () => {
    return (
        <div className='h-screen bg-black bg-opacity-50'>
            <div className="flex justify-center items-center">
                <Card className="w-[350px] mt-32">
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>Enter your Credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="john@gmail.com" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Button type="submit">Sign In</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <BottomWarning label="Don't have an account?" linkLabel="Sign Up" to="/signup"></BottomWarning>
                </Card>
            </div>
        </div>
    )
}

export default Signin