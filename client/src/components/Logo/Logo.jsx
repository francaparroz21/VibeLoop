import React from 'react'

function Logo() {
  return (
    <div className='logo w-20'>
      <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
    </div>
  )
}

export default Logo
