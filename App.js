import { StatusBar } from 'expo-status-bar';
import { createContext } from 'react';
import { StyleSheet, View } from 'react-native';
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
        dim: [17,2],
        type: 'ground'
      },
      {
        posision: [15,9],
        dim: [2,10],
        type: 'ground',
      },
      {
        posision: [2,5],
        type: 'question',
      },
      {
        posision: [5,5],
        type: 'question',
      }
    ],
    mario: {
      posision: [0,2],
      speed: 8,//Bricks per Second,
      updateRate: 25,//Frames per Second
    }
  }

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