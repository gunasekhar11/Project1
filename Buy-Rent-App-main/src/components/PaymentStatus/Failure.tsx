import React from 'react'
import {BsFillExclamationCircleFill} from 'react-icons/bs'
import './Failure.css'

const Failure = () => {
  return (
    <div className='failure'>
        <BsFillExclamationCircleFill className='icons'/>
        <p>Payment Failed</p>
    </div>
  )
}

export default Failure