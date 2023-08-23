import { useContext, useEffect, useRef, useState } from "react";
import { gameContext } from "../App";

const CoinAmountDisplay = () => {
    const fontSize = useRef(50);
    
    var coinCountRef = useRef(useContext(gameContext).mario.coinCount);

    var [coinCountState, setCoinCountState] = useState(coinCountRef.current.current);

    useEffect(() => {
        setInterval(() => {
            if (coinCountRef.current.current != coinCountState) {
                coinCountState = coinCountRef.current.current;
                setCoinCountState(coinCountState);
            };
        })
    })

    return(<>
        <text y={fontSize.current} fontSize={fontSize.current} fill="white">Coins: {coinCountState}</text>
    </>)
};

export default CoinAmountDisplay;