import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";

const Mario = () => {
    const stats = useRef({
        updateRate: useContext(gameContext).mario.updateRate,
        speed: useContext(gameContext).mario.speed,
        gravity: useContext(gameContext).game.gravity / useContext(gameContext).mario.updateRate,
    });
    var bricks = useRef(useContext(gameContext).bricks);
    var canJump = useRef(false);
    var xSpeed = useRef(0);
    var ySpeed = useRef(0);
    var [character, setCharacter] = useState('Mario');
    var [x, setX] = useState(useContext(gameContext).mario.posision[0]);
    var [y, setY] = useState(useContext(gameContext).mario.posision[1]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'd'){
                xSpeed.current = 1;
            } else if (e.key === 'a'){
                xSpeed.current = -1;
            } else if (e.key === 'l'){
                setCharacter('Luigi');
                alert('Luigi! ME!');
            }else if (e.key === 'm') {
                setCharacter('Mario');
                alert('It\'s a me! MARIO!');
            } else if (e.key === ' ' && canJump.current === true) {
                ySpeed.current = 1;
                y += 0.01;
                setY(y);
            };
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'd' || e.key === 'a'){
                xSpeed.current = 0;
            };
        });

        setInterval(() => {
            canJump.current = false;

            if (xSpeed.current === 1) {
                x += stats.current.speed / stats.current.updateRate;
            } else if (xSpeed.current === -1){
                x -= stats.current.speed / stats.current.updateRate;
            };

            ySpeed.current -= stats.current.gravity;
            y += ySpeed.current;

            for (var i in bricks.current){
                if (y >= bricks.current[i].posision[1] + 1 + ySpeed.current && y <= bricks.current[i].posision[1] + 1 && x > bricks.current[i].posision[0] - 1 && x < bricks.current[i].posision[0] + (bricks.current[i].dim != undefined ? bricks.current[i].dim[0] : 1)){
                    canJump.current = true;
                    ySpeed.current = 0;
                    y = bricks.current[i].posision[1] + 1;
                    break;
                } else if (y >= bricks.current[i].posision[1] - (bricks.current[i].dim != undefined ? bricks.current[i].dim[1] : 1) && y <= bricks.current[i].posision[1] - (bricks.current[i].dim != undefined ? bricks.current[i].dim[1] : 1) + ySpeed.current && x > bricks.current[i].posision[0] - 1 && x < bricks.current[i].posision[0] + (bricks.current[i].dim != undefined ? bricks.current[i].dim[0] : 1)){
                    ySpeed.current *= -1;
                    y = bricks.current[i].posision[1] - (bricks.current[i].dim != undefined ? bricks.current[i].dim[1] : 1);
                    break;
                };
            };

            for (var i in bricks.current){
                if (x >= bricks.current[i].posision[0] + (bricks.current[i].dim != undefined ? bricks.current[i].dim[0] : 1) + xSpeed.current * stats.current.speed / stats.current.updateRate && x <= bricks.current[i].posision[0] + (bricks.current[i].dim != undefined ? bricks.current[i].dim[0] : 1) && y > bricks.current[i].posision[1] - (bricks.current[i].dim != undefined ? bricks.current[i].dim[1] : 1) && y < bricks.current[i].posision[1] + 1){
                    x = bricks.current[i].posision[0] + (bricks.current[i].dim != undefined ? bricks.current[i].dim[0] : 1);
                    break;
                } else if (x >= bricks.current[i].posision[0] - 1 && x <= bricks.current[i].posision[0] + xSpeed.current * stats.current.speed / stats.current.updateRate && y > bricks.current[i].posision[1] - (bricks.current[i].dim != undefined ? bricks.current[i].dim[1] : 1) && y < bricks.current[i].posision[1] + 1){
                    x = bricks.current[i].posision[0] - 1;
                    break;
                };
            };

            setY(y);
            setX(x);
        }, 1000 / stats.current.updateRate);
    }, []);

    console.warn(character + ' rendered!');

    return(<>
        <circle cx={(x + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (y + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill={character === 'Mario' ? "red" : "green"}/>
    </>);
};

export default Mario;