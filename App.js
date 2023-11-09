import { StatusBar } from "expo-status-bar";
import { createContext, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Brick from "./components/brick";
import Mario from "./components/mario";
import Powerups from "./components/powerUps";
import CoinAmountDisplay from "./components/coinAmountDisplay";

var gameContext = createContext();

export default function App() {
  var gameContextValue = useRef({
    game: {
      gridSize: 75,
      height: 750,
      width: 1250,
      gravity: 2, //Bricks per Second squared
      scrollDistance: { current: 0 },
    },
    level: {
      bricks: [
        {
          position: [0, 1],
          dim: [32, 2],
          type: "ground",
        },
        {
          position: [7, 5],
          type: "question",
        },
        {
          position: [10, 5],
          type: "question",
          content: "mushroom",
        },
        {
          position: [11, 5],
          type: "brick",
        },
        {
          position: [12, 5],
          type: "question",
        },
        {
          position: [12, 9],
          type: "question",
          content: "1-up",
        },
        {
          position: [13, 5],
          type: "brick",
        },
        {
          position: [14, 5],
          type: "question",
        },
      ],
      powerups: [
        {
          position: [27, 2],
          type: "coin",
        },
        {
          position: [27, 4],
          type: "coin",
        },
        {
          position: [27, 6],
          type: "coin",
        },
        {
          position: [28, 3],
          type: "coin",
        },
        {
          position: [28, 5],
          type: "coin",
        },
        {
          position: [29, 2],
          type: "coin",
        },
        {
          position: [29, 4],
          type: "coin",
        },
        {
          position: [29, 6],
          type: "coin",
        },
        {
          position: [30, 3],
          type: "coin",
        },
        {
          position: [30, 5],
          type: "coin",
        },
        {
          position: [31, 2],
          type: "coin",
        },
        {
          position: [31, 4],
          type: "coin",
        },
        {
          position: [31, 6],
          type: "coin",
        },
      ],
    },
    mario: {
      position: [0, 2],
      powerupState: 1,
      coinCount: { current: 0 },
      speed: 16, //Bricks per Second,
      acceleration: 0.1,
      updateRate: 25, //Frames per Second
    },
  });

  var mouseTimeout = useRef();

  useEffect(() => {
    document.title = "Mario bros";

    document.addEventListener("mousemove", () => {
      document.body.style.cursor = "default";
      clearTimeout(mouseTimeout.current);
      mouseTimeout.current = setTimeout(() => {
        document.body.style.cursor = "none";
      }, 3000);
    });
  }, []);

  var brickOutput = [];
  for (var i in gameContextValue.current.level.bricks) {
    brickOutput.push(<Brick key={"brick " + i} id={i} />);
  }

  return (
    <gameContext.Provider value={gameContextValue.current}>
      <View style={styles.container}>
        <svg
          style={styles.gameArea}
          width={gameContextValue.current.game.width}
          height={gameContextValue.current.game.height}
        >
          {brickOutput}
          <Powerups />
          <Mario />
          <CoinAmountDisplay />
        </svg>
        <StatusBar style="auto" />
      </View>
    </gameContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  gameArea: {
    backgroundColor: "blue",
  },
});

export { gameContext, styles };
