import { StatusBar } from 'expo-status-bar';
import { createContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Brick from './components/brick';
import Mario from './components/mario';

var gameContext = createContext();

export default function App() {
  var context = {
    game: {
      gridSize: 75,
      height: 750,
      gravity: 1,//Pixels per Second squared
    },
    bricks: [
      {
        posision: [0,0],
        dim: [8,1]
      },
      {
        posision: [3,4],
        type: 'question',
      },
    ],
    mario: {
      posision: [0,2],
      speed: 8,//Bricks per Second,
      updateRate: 25,//Frames per Second
    }
  }

  var brickOutput = [];
  for (var i in context.bricks){
    brickOutput.push(<Brick key={'brick ' + i} id={i} />)
  };

  console.warn('Game rendered!');

  return (
    <gameContext.Provider value={context}>
      <View style={styles.container}>
        <svg style={styles.gameArea} width={1250} height={context.game.height}>
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