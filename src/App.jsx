import { useState , useEffect } from 'react'
import './App.css'
import Card from './Card'
import PlayerCards from './PlayerCards'

function App() {
    const [currentPair, setCurrentPair] = useState([]);
    let [user1Choice , setUser1Choice] = useState([]);
    let [user2Choice , setUser2Choice] = useState([]);
    let [user1Result , setUser1Result] = useState(0);
    let [user2Result , setUser2Result] = useState(0);
    let [disableCard , setDisableCard] = useState(100);        //card not exists
    let [finalResult , setFinalResult] = useState("");
    let [tempFlipped , setTempFlipped] = useState(0);
    let [pointerBlock , setPointerBlock] = useState(false)
    let [userTurn , setUserTurn] = useState(1);             // either 1 or 2

  const updateCurrPair = (flipedCardNew) => {
    setCurrentPair((prev) => {
      if (prev.length === 0) {
        console.log('first');
        flipedCardNew.isTempFlipped=true;
        setTempFlipped(1);
        return [flipedCardNew];
      }
      if(prev.length === 1) {
        if (prev[0].side === flipedCardNew.side) {
          console.log('same side click ignored');
          return prev        }
        console.log('second');
       flipedCardNew.isTempFlipped=true;
       setTempFlipped(2);
       setPointerBlock(true);


        const newPair = [...prev, flipedCardNew];

        // Do match check immediately
        if (newPair[0].value === newPair[1].value) {
        setDisableCard(newPair[0].value);
        }



         return [...prev, flipedCardNew];             //curr pair now have both cards
    }
      return prev;
    });
  };


//user choice array updated here.
useEffect(() => {
   if(currentPair.length === 2){
       if (user1Choice.length < 2) {
         setUser1Choice(currentPair);
         setUserTurn(2);
       }
      else if (user2Choice.length < 2) {
         setUser2Choice(currentPair);
         setUserTurn(1);
       }
       setCurrentPair([]);
   }
},[currentPair]);










useEffect(() => {
  if(user1Choice.length){
    if(user1Choice[0].value === user1Choice[1].value){
      setUser1Result((prev) => prev+=1);
    }else{
      setUser2Choice([]);
    }
  }
}, [user1Choice]);
useEffect(() => {
 if(user2Choice.length){
     if(user2Choice[0].value === user2Choice[1].value){
      setUser2Result((prev) => prev+=1);
    }else{
      setUser1Choice([]);
    }
    // setUser1Choice([]);
    // setUser2Choice([]);
  }
}, [user2Choice]);











useEffect(() =>{
 console.log("user2 result :",user2Result);
 setUserTurn(2)
 setUser2Choice([]);
}, [user2Result])
useEffect(() =>{
 console.log("user1 result :", user1Result);
 setUserTurn(1);
 setUser1Choice([]);

}, [user1Result])




let result = () =>{
  console.log("result checking");
  if(user1Result>user2Result){
   setFinalResult("Player1 win this match 👑");
  }
  else if(user1Result<user2Result){
    setFinalResult("Player2 win this match 👑");
  }
  else{
    setFinalResult("match draw");
  }
}


  return (
    <div className='app'>
      <PlayerCards side={"top"} updateCurrPair={updateCurrPair} disableCard={disableCard} result={result} tempFlipped={tempFlipped} pointerBlock={pointerBlock} setPointerBlock={setPointerBlock}/>
       <div className='scores'>
        <div className={` players player1 ${userTurn===1 ? "userTurn" : ''}`}><small>Player1</small><h3>{user1Result}</h3></div>
        <div className='finalResult'><strong>{finalResult}</strong></div>
        <div className={` players player2 ${userTurn===2 ? "userTurn" : ''}`}><small>Player2</small><h3>{user2Result}</h3></div>
       </div>
      <PlayerCards side={"bottom"} updateCurrPair={updateCurrPair} disableCard={disableCard} result={result} tempFlipped={tempFlipped} pointerBlock={pointerBlock} setPointerBlock={setPointerBlock}/>
    </div>
  )
}

export default App
