import React from 'react'
import './CardsContent.css'

const CardsContent = ({children}) => {
  return (
    <>
    <div className="main-section">
        <div className="content-part">
            {children}
        </div>
    </div>
    </>
  )
}

export default CardsContent