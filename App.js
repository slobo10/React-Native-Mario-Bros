import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Brick from './components/brick';
import Mario from './components/mario';
import Powerups from './components/powerUps';
import CoinAmountDisplay from './components/coinAmountDisplay';

var gameContext = createContext();

export default function App() {
  var gameContextValue = useRef({
    game: {
      gridSize: 75,
      height: 750,
      width: 1250,
      gravity: 2,//Bricks per Second squared
      scrollDistance: {current: 0},
    },
    level: {
      bricks: [
        {
          posision: [0,1],
          dim: [32,2],
          type: 'ground',
        },
        {
          posision: [7,5],
          type: 'question',
        },
        {
          posision: [10,5],
          type: 'question',
          content: 'mushroom',
        },
        {
          posision: [11,5],
          type: 'brick',
        },
        {
          posision: [12,5],
          type: 'question',
        },
        {
          posision: [12,9],
          type: 'question',
        },
        {
          posision: [13,5],
          type: 'brick',
        },
        {
          posision: [14,5],
          type: 'question',
        },
      ],
      powerups: [
        {
          posision: [31,2],
          type: 'coin',
        },
      ],
    },
    mario: {
      posision: [0,2],
      powerupState: 1,
      coinCount: {current: 0},
      speed: 8,//Bricks per Second,
      updateRate: 25,//Frames per Second
    }
  });

  useEffect(() => {
    document.title = 'Mario bros';
  }, []);

  var brickOutput = [];
  for (var i in gameContextValue.current.level.bricks){
    brickOutput.push(<Brick key={'brick ' + i} id={i} />)
  };

  return (
    <gameContext.Provider value={gameContextValue.current}>
      <View style={styles.container}>
        <svg style={styles.gameArea} width={gameContextValue.current.game.width} height={gameContextValue.current.game.height}>
          {brickOutput}
          <Powerups />
          <Mario />
          <CoinAmountDisplay />
        </svg>
        <StatusBar style="auto" />
      </View>
    </gameContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameArea: {
    backgroundColor: 'blue'
  },
});

export {gameContext, styles};