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
    var [x, setX] = useState(useContext(gameContext).mario.posision[0]);
    var [y, setY] = useState(useContext(gameContext).mario.posision[1]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'd'){
                xSpeed.current = 1;
            } else if (e.key == 'a'){
                xSpeed.current = -1;
            } else if (e.key == ' ' && canJump.current) {
                canJump.current = false;
                ySpeed.current = 0.6;
                y += 0.01;
                setY(y);
            };
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key == 'd' || e.key == 'a'){
                xSpeed.current = 0;
            };
        });

        setInterval(() => {
            if (xSpeed.current == 1) {
                x += stats.current.speed / stats.current.updateRate;
            } else if (xSpeed.current == -1){
                x -= stats.current.speed / stats.current.updateRate;
            };

            ySpeed.current -= stats.current.gravity;
            y += ySpeed.current;
            
            var stopperBlock = null;
            for (var i in bricks.current){
                if (bricks.current[i].type == undefined && y <= bricks.current[i].posision[1] + bricks.current[i].dim[1] && y >= bricks.current[i].posision[1] - 1 && x > bricks.current[i].posision[0] - 1 && x < bricks.current[i].posision[0] + bricks.current[i].dim[0]) {
                    stopperBlock = bricks.current[i];
                };
            };

            if (stopperBlock != null){
                canJump.current = true;
                ySpeed.current = 0;
                y = stopperBlock.posision[1] + 1;
            } //else {
            //    ySpeed.current -= stats.current.gravity;
            //    y += ySpeed.current;
            //};

            setY(y);
            setX(x);
        }, 1000 / stats.current.updateRate);
    }, []);

    console.warn('Mario rendered!');

    return(<>
        <circle cx={(x + 0.5) * useContext(gameContext).game.gridSize} cy={useContext(gameContext).game.height - (y + 0.5) * useContext(gameContext).game.gridSize} r={useContext(gameContext).game.gridSize / 2} fill="red"/>
    </>);
};

export default Mario;