import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect } from 'react';
import { StyleSheet, View, useAnimatedValue } from 'react-native';
import Brick from './components/brick';
import Mario from './components/mario';

var gameContext = createContext();

export default function App() {
  var gameContextValue = {
    game: {
      gridSize: 75,
      height: 750,
      gravity: 2,//Pixels per Second squared
    },
    bricks: [
      {
        posision: [0,1],
        dim: [8,2],
        type: 'ground'
      },
      {
        posision: [3,5],
        type: 'question',
      },
    ],
    mario: {
      posision: [0,2],
      speed: 8,//Bricks per Second,
      updateRate: 25,//Frames per Second
    }
  };

  useEffect(() => {
    document.title = 'Mario bros'
  }, []);

  var brickOutput = [];
  for (var i in gameContextValue.bricks){
    brickOutput.push(<Brick key={'brick ' + i} id={i} />)
  };

  console.warn('Game rendered!');

  return (
    <gameContext.Provider value={gameContextValue}>
      <View style={styles.container}>
        <svg style={styles.gameArea} width={1250} height={gameContextValue.game.height}>
          {brickOutput}
          <Mario />
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