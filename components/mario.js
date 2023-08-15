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
    var updateInterval = useRef(undefined);
    var canJump = useRef(false);
    var bricks = useRef(useContext(gameContext).level.bricks);
    var powerups = useRef(useContext(gameContext).level.powerups);

    var [x, setX] = useState(useContext(gameContext).mario.posision[0]);
    var [y, setY] = useState(useContext(gameContext).mario.posision[1]);
    var [powerupState, setPowerupstate] = useState(useContext(gameContext).mario.powerupState);
    var [character, setCharacter] = useState('Mario');

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (!(e.repeat || e.ctrlKey || e.altKey)){
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
                        document.title = 'Luigi bros';
                        alert('Luigi! ME!');
                        break;
                    };
                    case 'M': {
                        setCharacter('Mario');
                        document.title = 'Mario bros';
                        alert('It\'s a me! MARIO!');
                        break;
                    };
                };
            };
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key.toUpperCase() === 'D' || e.key.toUpperCase() === 'A'){
                xSpeed.current = 0;
            };
        });

        updateInterval.current = setInterval(() => {
            canJump.current = false;

            if (xSpeed.current === 1) {
                x += stats.current.speed / stats.current.updateRate;
            } else if (xSpeed.current === -1){
                x -= stats.current.speed / stats.current.updateRate;
            };

            ySpeed.current -= stats.current.gravity;
            y += ySpeed.current;

            [x,y] = checkForCollision(x, y, xSpeed.current * stats.current.speed / stats.current.updateRate, ySpeed.current, powerupState < 2 ? 1 : 2, bricks.current, (brick) => {
                canJump.current = true;
                ySpeed.current = 0;
            }, (brick) => {
                ySpeed.current *= -1;
                if (brick.type === 'question' || brick.type === 'hidden'){
                    powerups.current.push({
                        posision: [brick.posision[0], brick.posision[1] + 1],
                        type: brick.content,
                    });
                    brick.type = 'empty';
                };
            }, () => {}, () => {});

            for (var i = 0; i < powerups.current.length; i++) {
                if (x > powerups.current[i].posision[0] - 1 && x < powerups.current[i].posision[0] + 1 && y > powerups.current[i].posision[1] - 1 && y < powerups.current[i].posision[1] + 1){
                    switch (powerups.current[i].type){
                        case 'mushroom': {
                            powerupState = 2;
                            setPowerupstate(powerupState);
                        };
                    };
                    powerups.current.splice(i,1);
                    break;
                };
            };

            if (y < (powerupState < 2 ? -1 : -2)) {
                clearInterval(updateInterval.current);
            };

            setY(y);
            setX(x);
        }, 1000 / stats.current.updateRate);
    }, []);

    console.warn(character + ' rendered!');
    switch (powerupState) {
        case 1: {
            return(<>
                <circle cx={(x + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (y + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill={character === 'Mario' ? "red" : "green"}/>
            </>);
        };
        case 2: {
            return(<>
                <ellipse cx={(x + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (y + 1) * useContext(gameContext).game.gridSize} rx={useContext(gameContext).game.gridSize / 2} ry={useContext(gameContext).game.gridSize} fill={character === 'Mario' ? "red" : "green"}/>
            </>);
        };
    };
};

export default Mario;