import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";
import { checkForCollision } from "../lib/mathlib";

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

            [x,y] = checkForCollision(x, y, xSpeed.current * stats.current.speed / stats.current.updateRate, ySpeed.current, bricks.current, (brick) => {
                canJump.current = true;
                ySpeed.current = 0;
            }, (brick) => {
                ySpeed.current *= -1;
                if (brick.type === 'question'){
                    brick.type = 'empty';
                };
            }, () => {}, () => {});

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