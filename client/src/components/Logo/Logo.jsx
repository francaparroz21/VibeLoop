import React from 'react'

function Logo() {
  return (
    <div className='logo h-16 w-16'>
      <img src={process.env.PUBLIC_URL + '/images/logowbg.jpg'} alt="logo" />
    </div>
  )
}

export default Logo
