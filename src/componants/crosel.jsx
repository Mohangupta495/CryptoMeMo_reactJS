import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { CryptoState } from "./CryptoContext";
import { TrendingCoins } from "../config/apis";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  crosel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    color: "red"
  },
  crouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  }
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Crosel = () => {
  const [trandingData, setTrandingData] = useState([]);
  const { currency } = CryptoState();
  const classes = useStyles();
  const [symbol, setSymbol] = useState("₹");
  const fetchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrandingData(data);
    console.log(data);
  };
  useEffect(() => {
    fetchTrandingCoins();
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  const items = trandingData.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    console.log(profit);
    return (
      <Link className={classes.crouselItem} to={`/coin/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
          height="80"
          srcset=""
          style={{ marginTop: 10, marginBottom: 15 }}
        />
        <span>
          {coin.symbol}
          &nbsp;
          {profit && " +"}
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500
            }}
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2
    },
    512: {
      items: 4
    }
  };
  return (
    <div className={classes.crosel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        items={items}
        autoPlay
      />
    </div>
  );
};
export default Crosel;
