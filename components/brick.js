import { useContext } from "react";
import { gameContext } from "../App";

const Brick = (props) => {
    console.warn('Brick ' + props.id + ' rendered!');

    if (useContext(gameContext).bricks[props.id].type == 'question'){
        return(<>
            <rect x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (useContext(gameContext).bricks[props.id].posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="#b3b329" /><text fontSize={100} x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize + 15} y={useContext(gameContext).game.height - useContext(gameContext).bricks[props.id].posision[1] * useContext(gameContext).game.gridSize - 2}>?</text>
        </>);
    };

    return(<>
        <rect x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (useContext(gameContext).bricks[props.id].posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize * useContext(gameContext).bricks[props.id].dim[0]} height={useContext(gameContext).game.gridSize * useContext(gameContext).bricks[props.id].dim[1]} fill="#5c260f" />
    </>);
};

export default Brick;