import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";

const Brick = (props) => {
    var scrollDistanceRef = useRef(useContext(gameContext).game.scrollDistance);
    var currentBrick = useRef(useContext(gameContext).level.bricks[props.id]);

    var [scrollDistanceState, setScrollDistanceState] = useState(scrollDistanceRef.current.current);
    var [brickType, setBrickType] = useState(currentBrick.current.type);

    useEffect(() => {
        if (brickType === 'question' || 'hidden') {
            setInterval(() => {
                if (currentBrick.current.type !== brickType) {
                    setBrickType(currentBrick.current.type);
                };
            }, 50);
        };
        setInterval(() => {
            if (scrollDistanceRef.current.current != scrollDistanceState) {
                setScrollDistanceState(scrollDistanceRef.current.current);
            };
        })
    }, []);

    switch (brickType) {
        case 'ground': {
            return(<>
                <rect x={(currentBrick.current.position[0] - scrollDistanceState) * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.position[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize * currentBrick.current.dim[0]} height={useContext(gameContext).game.gridSize * currentBrick.current.dim[1]} fill="#5c260f" />
            </>);
        };
        case 'brick': {
            return(<>
                <rect x={(currentBrick.current.position[0] - scrollDistanceState) * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.position[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="#8a4a0c" />
            </>)
        };
        case 'question': {
            return(<>
                <rect x={(currentBrick.current.position[0] - scrollDistanceState) * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.position[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="yellow" /><text fontSize={100} x={(currentBrick.current.position[0] - scrollDistanceRef.current.current) * useContext(gameContext).game.gridSize + 15} y={useContext(gameContext).game.height - currentBrick.current.position[1] * useContext(gameContext).game.gridSize - 2}>?</text>
            </>);
        };
        case 'hidden': {
            return(<></>);
        };
        case 'empty': {
            return(<>
                <rect x={(currentBrick.current.position[0] - scrollDistanceState) * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (currentBrick.current.position[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} fill="#5c260f" />
            </>);
        };
    };
    return(<></>);
};

export default Brick;