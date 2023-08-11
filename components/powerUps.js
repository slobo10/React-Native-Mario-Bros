import { useContext, useEffect, useRef, useState } from "react"
import { gameContext } from "../App"

const Powerups = () => {
    var powerups = useRef(useContext(gameContext).level.powerups);
    var [totalPowerups, setTotalPowerups] = useState(powerups.current.length);

    useEffect(() => {
        setInterval(() => {
            if (powerups.current.length != totalPowerups){
                setTotalPowerups(powerups.current.length);
            };
        }, 50);
    }, []);
    
    var output = [];
    for (var i in powerups.current) {
        output.push(<Powerup key={'Powerup ' + i} id={i} />)
    };

    return(<>
        {output}
    </>);
};

const Powerup = (props) => {
    var currentPowerUp = useRef(useContext(gameContext).level.powerups[props.id]);

    console.warn('Powerup ' + props.id + ' rendered!')

    return(<>
        <circle cx={(currentPowerUp.current.posision[0] + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (currentPowerUp.current.posision[1] + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill={currentPowerUp.current.type === 'mushroom' ? 'red' : currentPowerUp.current.type === '1-up' ? 'green' : 'black'}/>
    </>)
};

export default Powerups;