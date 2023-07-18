import { useContext } from "react";
import { gameContext, styles } from "../App";

const Brick = (props) => {
    console.warn('Brick ' + props.id + ' rendered!');

    return(<>
        <rect x={useContext(gameContext).bricks[props.id].posision[0] * useContext(gameContext).game.gridSize} y={useContext(gameContext).game.height - (useContext(gameContext).bricks[props.id].posision[1] + 1) * useContext(gameContext).game.gridSize} width={useContext(gameContext).game.gridSize} height={useContext(gameContext).game.gridSize} style={styles.brick} />
    </>);
};

export default Brick;