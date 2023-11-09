import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { gameContext } from "../App";
import { checkForCollision } from "../lib/mathlib";

const Mario = () => {
  const stats = useRef({
    updateRate: useContext(gameContext).mario.updateRate,
    speed: useContext(gameContext).mario.speed,
    acceleration: useContext(gameContext).mario.acceleration,
    gridSize: useContext(gameContext).game.gridSize,
    gravity:
      useContext(gameContext).game.gravity /
      useContext(gameContext).mario.updateRate,
    gameWidth: useContext(gameContext).game.width,
  });

  var xSpeed = useRef(0);
  var ySpeed = useRef(0);
  var scrollDistanceRef = useRef(useContext(gameContext).game.scrollDistance);
  var coinCount = useRef(useContext(gameContext).mario.coinCount);
  var updateInterval = useRef(undefined);
  var canJump = useRef(false);
  var bricks = useRef(useContext(gameContext).level.bricks);
  var powerups = useRef(useContext(gameContext).level.powerups);
  var keysDown = useRef([false, false]);

  var [x, setX] = useState(useContext(gameContext).mario.position[0]);
  var [y, setY] = useState(useContext(gameContext).mario.position[1]);
  var [scrollDistanceState, setScrollDistanceState] = useState(
    scrollDistanceRef.current.current
  );
  var [powerupState, setPowerupState] = useState(
    useContext(gameContext).mario.powerupState
  );
  var [character, setCharacter] = useState("Mario");

  var height = useRef(powerupState < 2 ? 1 : 2);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (!(e.repeat || e.ctrlKey || e.altKey)) {
        switch (e.key.toUpperCase()) {
          case "D": {
            keysDown.current[1] = true;
            break;
          }
          case "A": {
            keysDown.current[0] = true;
            break;
          }
          case " ": {
            if (canJump.current) {
              ySpeed.current = 1;
              y += 0.01;
              setY(y);
            }
            break;
          }
          case "L": {
            setCharacter("Luigi");
            document.title = "Luigi bros";
            alert("Luigi! ME!");
            break;
          }
          case "M": {
            setCharacter("Mario");
            document.title = "Mario bros";
            alert("It's a me! MARIO!");
            break;
          }
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key.toUpperCase() === "D" || e.key.toUpperCase() === "A") {
        keysDown.current = [false, false];
      }
    });

    updateInterval.current = setInterval(() => {
      canJump.current = false;

      if (keysDown.current[0]) {
        if (xSpeed.current <= 0) {
          if (xSpeed.current >= -1) {
            xSpeed.current -= stats.current.acceleration;
          } else {
            xSpeed.current = -1;
          }
        } else {
          xSpeed.current -= stats.current.acceleration * 2;
        }
      } else if (keysDown.current[1]) {
        if (xSpeed.current >= 0) {
          if (xSpeed.current <= 1) {
            xSpeed.current += stats.current.acceleration;
          } else {
            xSpeed.current = 1;
          }
        } else {
          xSpeed.current += stats.current.acceleration * 2;
        }
      } else if (!(keysDown.current[0] || keysDown.current[1])) {
        if (xSpeed.current > 0) {
          xSpeed.current -= stats.current.acceleration;
        } else if (xSpeed.current < 0) {
          xSpeed.current += stats.current.acceleration;
        }

        if (
          (xSpeed.current < stats.current.acceleration && xSpeed.current > 0) ||
          (xSpeed.current > 0.1 && xSpeed.current < 0)
        ) {
          xSpeed.current = 0;
        }
      }

      x += (xSpeed.current * stats.current.speed) / stats.current.updateRate;

      ySpeed.current -= stats.current.gravity;
      y += ySpeed.current;

      if (x < scrollDistanceState) {
        x = scrollDistanceState;
        xSpeed.current = 0;
      }

      [x, y] = checkForCollision(
        x,
        y,
        (xSpeed.current * stats.current.speed) / stats.current.updateRate,
        ySpeed.current,
        powerupState < 2 ? 1 : 2,
        bricks.current,
        (brick) => {
          canJump.current = true;
          ySpeed.current = 0;
        },
        (brick) => {
          ySpeed.current *= -1;

          if (brick.content != undefined) {
            powerups.current.push({
              position: [brick.position[0], brick.position[1] + 1],
              type: brick.content,
            });
            brick.content = undefined;
            brick.type = "empty";
          } else {
            switch (brick.type) {
              case "question": {
                brick.type = "empty";
                coinCount.current.current++;
                break;
              }
              case "brick": {
                brick.type = undefined;
                break;
              }
            }
          }
        },
        () => {
          xSpeed.current = 0;
        },
        () => {
          xSpeed.current = 0;
        }
      );

      for (var i = 0; i < powerups.current.length; i++) {
        if (
          x > powerups.current[i].position[0] - 1 &&
          x < powerups.current[i].position[0] + 1 &&
          y > powerups.current[i].position[1] - height.current &&
          y < powerups.current[i].position[1] + 1
        ) {
          switch (powerups.current[i].type) {
            case "mushroom": {
              powerupState = 2;
              setPowerupState(powerupState);
              break;
            }
            case "coin": {
              coinCount.current.current++;
              break;
            }
          }
          powerups.current.splice(i, 1);
          break;
        }
      }

      if (
        x >=
        ((stats.current.gameWidth / stats.current.gridSize) * 3) / 4 +
          scrollDistanceState
      ) {
        scrollDistanceState =
          x - ((stats.current.gameWidth / stats.current.gridSize) * 3) / 4;
      }

      if (y < (powerupState < 2 ? -1 : -2)) {
        clearInterval(updateInterval.current);
      }

      setScrollDistanceState(scrollDistanceState);
      setY(y);
      setX(x);
    }, 1000 / stats.current.updateRate);
  }, []);

  useEffect(() => {
    scrollDistanceRef.current.current = scrollDistanceState;
  }, [scrollDistanceState]);

  useEffect(() => {
    height.current = powerupState < 2 ? 1 : 2;
  }, [powerupState]);

  return (
    <>
      <ellipse
        cx={(x - scrollDistanceState + 0.5) * stats.current.gridSize}
        cy={
          useContext(gameContext).game.height -
          (y + height.current / 2) * stats.current.gridSize
        }
        rx={stats.current.gridSize / 2}
        ry={(stats.current.gridSize * height.current) / 2}
        fill={character === "Mario" ? "red" : "green"}
      />
    </>
  );
};

export default Mario;
