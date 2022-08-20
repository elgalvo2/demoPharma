import React from "react";
import cross from '../../assets/cross.png'

export default function Nav({ pages = ['example'], title = 'App', reference, methods }) {
    return (
      <div ref={reference} className='Nav'>
        <div className='Nav-header'>
          <div className='Nav-title' >
            <h2>{title}</h2>
          </div>
          <div onClick={() => methods.handleOpen()} className='Nav-button'>
            <img src={cross} width={30} height={30} />
          </div>
        </div>
        <div className='nav-item-container'>
          {pages.map((item, index) => (
            <div className='Nav-item' key={index} onClick={()=>methods.handleChangeUI(item)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }
  