import React from 'react'
import { Image } from 'react-bootstrap'

const BannerItem = ({ imagePath }) => {
  return (
    <div className='mx-auto w-100'>
      <Image
        className='d-block w-100 h-100'
        src={`${imagePath}`}
        alt='Cover Photo'
        rounded='false'
      />
    </div>
  )
}

export default BannerItem
