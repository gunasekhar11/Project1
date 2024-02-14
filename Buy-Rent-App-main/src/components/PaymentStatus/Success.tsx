import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import './Success.css'

const Success = () => {
  return (
    <div className='success'>
        <AiFillCheckCircle className='icons'/>
        <p>Payment Successful</p>
    </div>
  )
}

export default Success