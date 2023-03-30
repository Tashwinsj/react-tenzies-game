import React from "react" ;
import "./dice.css"
export default function Dice(props){
    const styles = {
        backgroundColor: props.ishelda ? "#77DD77" : "white"
    }
    return(
         
        <div className="dice" style={styles} onClick={props.setclick}>
            <p className="num">{props.number}</p>
        </div>
         

    )
}