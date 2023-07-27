import { useContext } from "react";
import { gameContext } from "../App";

const Brick = (props) => {
    console.warn('Brick ' + props.id + ' rendered!');

    if (useContext(gameContext).bricks[props.id].type == 'question'){
        return(<>
            <rect x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (useContext(gameContext).bricks[props.id].posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="yellow" /><text fontSize={100} x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize + 15} y={useContext(gameContext).game.height - useContext(gameContext).bricks[props.id].posision[1] * useContext(gameContext).game.gridSize - 2}>?</text>
        </>);
    } else if (useContext(gameContext).bricks[props.id].type == 'ground'){
        return(<>
            <rect x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (useContext(gameContext).bricks[props.id].posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize * useContext(gameContext).bricks[props.id].dim[0]} height={useContext(gameContext).game.gridSize * useContext(gameContext).bricks[props.id].dim[1]} fill="#5c260f" />
        </>);
    };
    
    console.error('Error at "Brick" component:\n\tAll bricks must have a type attribute. None were given at index ' + props.id + '.');
};

export default Brick;