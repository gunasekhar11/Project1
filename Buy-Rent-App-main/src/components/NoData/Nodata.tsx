import React from 'react'
import noproduct from '../../Assets/no-product.png'
import './Nodata.css'

const Nodata = () => {
  return (
    <div className='nodata'>
        <h1 className='title'>No Products Found</h1>
        <br />
        <img src={noproduct} alt="" className='nodata-image'/>
    </div>
  )
}

export default Nodata