import React from 'react'
import "./Card.css"
import { useState,useEffect } from 'react';

const Card = ({cardNo , clickHandle , side , isFlipped , isTempFlipped ,pointerBlock}) => {

   const [showFlip, setShowFlip] = useState(false);
   const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let timer;
    if (isFlipped) {
      timer = setTimeout(() => {
        setShowFlip(true);
      }, 1000);
    } else {
      setShowFlip(false);
    }
    return () => clearTimeout(timer);
  }, [isFlipped]);



  let clickCardHandle = () =>{
    
      clickHandle(cardNo , side);
      
  }
   
  return (
    <div className={`card ${pointerBlock ? 'blockPointer' : ''} ${isTempFlipped ? '' : 'hide'} ${showFlip ? 'flipped' : ''}`} onClick={clickCardHandle} >
          <p className='value'>{cardNo}</p>
    </div>
  )
}

export default Card
