import React from 'react'
import Header from '../componets/Header'
function MainLeauts({children}) {
  return (
    <div>
      <Header />
        {children}
      
    </div>
  )
}

export default MainLeauts
