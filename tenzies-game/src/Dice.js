export default function Dice({dice,holdDice}){
    return (
        <button 
            style={{backgroundColor: dice.isHeld ? "#59E391" : "white"}} 
            className="dice"
            onClick={() => holdDice(dice.id)} 
            aria-pressed={dice.isHeld}
            aria-label={`Die with value ${dice.value}, 
            ${dice.isHeld ? "held" : "not held"}`}
        >
            {dice.value}
        </button>
    )
}