import './index.css';
import { useState, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
import Dice from "./Dice"
import Confetti from "react-confetti"

function App() {
  const [dice,setDice] = useState(() => getAllRandomDice())
  const buttonRef = useRef(null)
  const gameWon = dice.every(val => val.isHeld && val.value === dice[0].value)
  

  function getAllRandomDice(){
    return new Array(10).fill(0).map(arr => ({
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }))
  }
  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus()
    }
  },[gameWon])

  const diceElements = dice.map(diceObj => <Dice key={diceObj.id} dice={diceObj} holdDice={holdDice}/>)

  function rollDice(){
    if(gameWon){
      setDice(getAllRandomDice())
    }else{
      setDice(oldDice => oldDice.map(die => die.isHeld ? die : { ...die,value:Math.ceil(Math.random() * 6)}))
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => die.id === id ? { ...die,isHeld :!die.isHeld } : die))
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        ref = {buttonRef}
        className="roll-dice" 
        onClick={rollDice}>
        {gameWon ? "New Game": "Roll"}
      </button>
    </main>
  );
}

export default App;
