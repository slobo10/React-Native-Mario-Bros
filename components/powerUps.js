import { useContext, useEffect, useRef, useState } from "react"
import { gameContext } from "../App"

const Powerups = () => {
    var powerups = useRef(useContext(gameContext).level.powerups);

    var [totalPowerups, setTotalPowerups] = useState(powerups.current.length);

    useEffect(() => {
        setInterval(() => {
            if (powerups.current.length != totalPowerups){
                totalPowerups = powerups.current.length;
                setTotalPowerups(totalPowerups);
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
    var currentPowerup = useContext(gameContext).level.powerups[props.id];
    
    var scrollDistance = useRef(useContext(gameContext).game.scrollDistance);

    var [scrollDistanceState, setScrollDistanceState] = useState(scrollDistance.current.current);

    useEffect(() => {
        setInterval(() => {
            if (scrollDistance.current.current != scrollDistanceState) {
                setScrollDistanceState(scrollDistance.current.current);
            };
        }, 50);
    });

    if (currentPowerup != undefined){//TODO: Find better way to do this
        switch(currentPowerup.type) {
            case 'mushroom': {
                return(<>
                    <circle cx={(currentPowerup.posision[0] - scrollDistanceState + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (currentPowerup.posision[1] + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="red"/>
                </>);
            };
            case '1-up': {
                return(<>
                    <circle cx={(currentPowerup.posision[0] - scrollDistanceState + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (currentPowerup.posision[1] + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="green"/>
                </>);
            };
            case 'coin': {
                return(<>
                    <circle cx={(currentPowerup.posision[0] - scrollDistanceState + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (currentPowerup.posision[1] + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="yellow"/>
                </>);
            }
        };
    };
};

export default Powerups;