import { useContext, useEffect, useRef, useState } from "react";
import { Text } from "react-native-svg";
import { gameContext } from "../App";

const CoinAmountDisplay = () => {
  const fontSize = useRef(50);

  var coinCountRef = useRef(useContext(gameContext).mario.coinCount);

  var [coinCountState, setCoinCountState] = useState(
    coinCountRef.current.current
  );

  useEffect(() => {
    setInterval(() => {
      if (coinCountRef.current.current != coinCountState) {
        setCoinCountState(coinCountRef.current.current);
      }
    });
  });

  return (
    <>
      <Text y={fontSize.current} fontSize={fontSize.current} fill="white">
        Coins: {coinCountState}
      </Text>
    </>
  );
};

export default CoinAmountDisplay;
