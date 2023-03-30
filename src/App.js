
import React, { useState } from 'react';
import './App.css';
import Dice from './comp/dice';
import Confetti from "react-confetti-explosion" 


function App() {
  //dice state stores the object containing three fields id , value and isheld 
  const [dice , setdice] = useState(allnewdice()) ;
  //ten state holds the a boolean value related to the game being won or not yet won 
  const [ten , setten] = useState(false) ;
  //count state stores the number of time the dices have been rolled
  const [count , setcount] =useState(0) ;
  //useEffect react hook is used to check wheather the game is over or not and only renders when 
  //dice state changes
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isheld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setten(true)
         
    }
  }, [dice])
//this funtion sets the dices to random values in the beggining 
function allnewdice(){
    const arr =[] ; 
    for( let i =0 ;i< 10 ;i++){
      arr.push({id : i +1 , value : Math.ceil(Math.random()*6), isheld : false } ) ; 
    }
    return arr ; 
  }
//this funtion set the dices to random values which are not held and when the button roll is pressed 
function roll(){
    if(!ten){
      setcount(count+1) ;
     setdice(prev=> prev.map(dice =>
      {
        return dice.isheld ? dice : {...dice , value : Math.ceil(Math.random()*6)}
      }))} 
      else{
        setten(false) ;
        setcount(0) ;
        setdice(allnewdice) ; 
      }
  }
//this function set the isheld value to true whenever used clicks on the block 
function setclick(id){
     
      setdice(prev => prev.map(die => {
        return die.id === id  ?
        {...die , isheld : true} 
        :die
      }))

    }
  
//this code below maps the dices array and return the jsx elements ; 
const dices = dice.map(num => (<Dice key={num.id} number ={num.value} ishelda={num.isheld}  setclick={()=>setclick(num.id)}></Dice>))
return (
    <main>
        {ten && <Confetti />}
        <h1> Tenzies </h1>
        <div className="count">ROLL COUNT : {count}</div>
        <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        {dices}
        <button className='btn' onClick={roll}>{ten ? "NEW GAME " : "ROLL"}</button>
    </main>
  );
}

export default App;
