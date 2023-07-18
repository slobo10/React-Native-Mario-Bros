import { useContext } from "react";
import { gameContext } from "../App";

const Mario = () => {
    console.warn('Mario rendered!');

    return(<>
        <circle cx={(useContext(gameContext).mario.posision[0] + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (useContext(gameContext).mario.posision[1] + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="red"/>
    </>);
};

export default Mario;