import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";
import { checkForCollision } from "../lib/mathlib";

const Mario = () => {
    const stats = useRef({
        updateRate: useContext(gameContext).mario.updateRate,
        speed: useContext(gameContext).mario.speed,
        gravity: useContext(gameContext).game.gravity / useContext(gameContext).mario.updateRate,
    });

    var xSpeed = useRef(0);
    var ySpeed = useRef(0);
    var canJump = useRef(false);
    var bricks = useRef(useContext(gameContext).bricks);

    var [x, setX] = useState(useContext(gameContext).mario.posision[0]);
    var [y, setY] = useState(useContext(gameContext).mario.posision[1]);
    var [character, setCharacter] = useState('Mario');

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            switch (e.key.toUpperCase()) {
                case 'D': {
                    xSpeed.current = 1;
                    break;
                };
                case 'A': {
                    xSpeed.current = -1;
                    break;
                };
                case ' ': {
                    if (canJump.current) {
                        ySpeed.current = 1;
                        y += 0.01;
                        setY(y);
                    };
                    break;
                };
                case 'L': {
                    setCharacter('Luigi');
                    alert('Luigi! ME!');
                    break;
                };
                case 'M': {
                    setCharacter('Mario');
                    alert('It\'s a me! MARIO!');
                    break;
                }
            };
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key.toUpperCase() === 'D' || e.key.toUpperCase() === 'A'){
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
                if (brick.type === 'question' || brick.type === 'hidden'){
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