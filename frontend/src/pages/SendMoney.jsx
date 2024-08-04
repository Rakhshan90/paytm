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
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { baseURL } from '@/util/baseURL'
import ErrorComponent from '@/components/ui/ErrorComponent'

const SendMoney = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const to = location.pathname.split('/')[2];
  const [amountVal, setAmount] = useState(0);
  const [err, setErr] = useState("");

  const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

  const submbitHandler = async(e) => {
    e.preventDefault();
    const amount = parseInt(amountVal);
    try {
      const response = await axios.post(`${baseURL}/api/v1/account/transfer/${to}`, {amount, to}, config);
      if(response.status === 200) navigate('/');
    } catch (error) {
      setErr(error.response?.data?.message);
    }
    
  }



  return (
    <div className='bg-slate-200 bg-opacity-50 h-screen flex justify-center items-center'>
      <Card className="w-[350px]">
        <CardHeader>
          {err && (
            <ErrorComponent err={err} />
          )}
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center mb-2">
            <div className="h-12 w-12 bg-green-500 rounded-full flex justify-center">
              <div className="flex flex-col justify-center text-2xl font-semibold text-white">A</div>
            </div>
            <div className="text-2xl font-semibold">Friend's name</div>
          </div>
          <form onSubmit={submbitHandler}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">Amount (in Rs)</Label>
                <Input
                  type="number"
                  value={amountVal}
                  onChange={(e) => { setAmount(e.target.value) }}
                  id="firstName" placeholder="Enter amount" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button variant="secondary" type="submit">Initiate Transfer</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default SendMoney