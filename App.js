import { StatusBar } from 'expo-status-bar';
import { createContext } from 'react';
import { StyleSheet, View } from 'react-native';
import Brick from './components/brick';

var gameContext = createContext();

export default function App() {
  var context = {
    game: {
      gridSize: 75,
      height: 750,
    },
    bricks: [
      {
        posision: [0,0],
      },
      {
        posision: [1,0],
      },
      {
        posision: [2,0],
      },
      {
        posision: [3,0],
      },
    ],
  }

  var brickOutput = [];
  for (var i in context.bricks){
    brickOutput.push(<Brick key={'brick ' + i} id={i} />)
  };

  console.warn('Game rendered!');

  return (
    <gameContext.Provider value={context}>
      <View style={styles.container}>
        <svg style={styles.gameArea} width={1250} height={context.game.height}>{brickOutput}</svg>
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
  brick: {
    fill: '#5c260f',
  },
});

export {gameContext, styles};