import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";

const Mario = () => {
    const stats = useRef({
        updateRate: useContext(gameContext).mario.updateRate,
        speed: useContext(gameContext).mario.speed,
    });
    //const updateRate = useRef(useContext(gameContext).mario.updateRate);
    //const speed = useRef(useContext(gameContext).mario.speed);
    var xSpeed = useRef(0);
    var ySpeed = useRef(0);
    var [x, setX] = useState(useContext(gameContext).mario.posision[0]);
    var [y, setY] = useState(useContext(gameContext).mario.posision[1]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key == "d"){
                xSpeed.current = 1;
            }else if (e.key == "a"){
                xSpeed.current = -1;
            };
        });
        document.addEventListener('keyup', (e) => {
            if (e.key == "d" || e.key == "a"){
                xSpeed.current = 0;
            };
        });
        setInterval(() => {
            if (xSpeed.current == 1) {
                x += stats.current.speed / stats.current.updateRate;
                setX(x);
            } else if (xSpeed.current == -1){
                x -= stats.current.speed / stats.current.updateRate;
                setX(x);
            };
        }, 1000 / stats.current.updateRate);
    }, []);

    console.warn('Mario rendered!');

    return(<>
        <circle cx={(x + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (y + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="red"/>
    </>);
};

export default Mario;