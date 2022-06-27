import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { HistoricalChart } from "../config/apis";
import { CryptoState } from "./CryptoContext";
import { chartDays } from "../config/data";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0
    }
  },
  btn_container: {
    display: "flex",
    marginTop: 20,
    justifyContent: "space-around",
    width: "100%"
  },
  btn: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    width: "22%",
    margin: 5,
    "&:hover": {
      backgroundColor: "gold",
      color: "black"
    }
  }
}));
const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();
  const [historical, setHistorical] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [symbol, setSymbol] = useState("₹");
  const classes = useStyles();
  const fetchHistoricalChart = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistorical(data.prices);
    setLoading(true);
  };
  useEffect(() => {
    fetchHistoricalChart();
    if (currency === -"INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency, days]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  });
  console.log(historical);
  console.log(loading);
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!loading ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historical.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historical.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D"
                  }
                ]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1
                  }
                }
              }}
            />
            <div className={classes.btn_container}>
              {chartDays.map((day) => {
                return (
                  <span
                    key={day.value}
                    onClick={() => setDays(day.value)}
                    className={classes.btn}
                    style={{}}
                  >
                    {day.label}
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};
export default CoinInfo;
