import React, { useState , useEffect} from 'react'
import Card from './Card'
import "./PlayerCards.css"
import { randomCards } from './helper'
import { v4 as uuidv4 } from 'uuid';

const PlayerCards = ({side , updateCurrPair , disableCard ,result ,tempFlipped ,pointerBlock , setPointerBlock}) => {

    let [cardNo , setCardNo] = useState(randomCards(9 , side));
    // console.log(cardNo)
    
   useEffect(() =>{
    setTimeout(()=>{
       setPointerBlock(false);
    } , 1000)
   }, [pointerBlock])

      useEffect(() => {
    if (disableCard !== 100) {
      setCardNo((currCards) =>
        currCards.map((card) =>
          card.value === disableCard ? { ...card, isFlipped: true } : card
        )
      );
    }
  }, [disableCard]);


   useEffect(() =>{
    setTimeout(() =>{
      if(tempFlipped === 2){
      setCardNo((currCards) =>
        currCards.map((card) =>
          card.isTempFlipped === true ? { ...card, isTempFlipped: false } : card
        )
      );
    }
    },1000)
    
   },[tempFlipped])



  

    let clickHandleCard = (cardValue, side) => {
       // Find the clicked card in the updated array
        const clickedCard = cardNo.find(card => card.value === cardValue && card.side === side);
        // clickedCard.isTempFlipped=true;
        updateCurrPair(clickedCard);    //lifting up 
    };

    if(!(cardNo.find(card => card.isFlipped === false))){
      result();
    }
 
console.log(cardNo);
    

  return (
    <div className='playerCards'>
        {
            cardNo.map((val) =>{
                // console.log(val)
                return <Card cardNo={val.value} key={uuidv4()} clickHandle={clickHandleCard} side={side} isFlipped={val.isFlipped} isTempFlipped={val.isTempFlipped} pointerBlock={pointerBlock}/>
            })
        }
      
    </div>
  )
}

export default PlayerCards
