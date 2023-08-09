import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";

const Brick = (props) => {
    var currentBrick = useRef(useContext(gameContext).bricks[props.id])
    var [brickType, setBrickType] = useState(currentBrick.current.type)

    useEffect(() => {
        if (brickType === 'question') {
            setInterval(() => {
                if (currentBrick.current.type !== brickType) {
                    setBrickType(currentBrick.current.type);
                };
            }, 50);
        };
    }, []);

    console.warn('Brick ' + props.id + ' rendered!');

    if (brickType === 'question'){
        return(<>
            <rect x={currentBrick.current.posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="yellow" /><text fontSize={100} x={currentBrick.current.posision[0] * useContext(gameContext).game.gridSize + 15} y={useContext(gameContext).game.height - currentBrick.current.posision[1] * useContext(gameContext).game.gridSize - 2}>?</text>
        </>);
    } else if (brickType === 'ground'){
        return(<>
            <rect x={currentBrick.current.posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize * currentBrick.current.dim[0]} height={useContext(gameContext).game.gridSize * currentBrick.current.dim[1]} fill="#5c260f" />
        </>);
    } else if (brickType === 'empty') {
        return(<>
            <rect x={currentBrick.current.posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="#5c260f" />
        </>)
    };
    
    console.error('Error at "Brick" component:\n\tAll bricks must have a type attribute. None were given at index ' + props.id + '.');
};

export default Brick;