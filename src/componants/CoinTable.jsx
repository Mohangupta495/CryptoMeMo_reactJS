import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { numberWithCommas } from "./crosel";
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  CardContent,
  Typography,
  Container,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

import { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/apis";
import { CryptoState } from "./CryptoContext";
import { Pagination } from "@material-ui/lab";

export function convertAmt(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

const useStyles = makeStyles(() => ({
  row: {
    background: "#16171a",
    fontFamily: "Montserrat",
    "&:hover": {
      background: "#131111"
    }
  },
  ul: {
    "& .MuiPaginationItem-root": {
      color: "gold"
    }
  }
}));

const CoinTable = () => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffff"
      },
      type: "dark"
    }
  });
  const handleSearch = () => {
    return coinTable.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.name.toLowerCase().includes(search)
    );
  };

  const { currency } = CryptoState();
  const [symbol, setSymbol] = useState("₹");
  const [loading, setLoding] = useState(false);
  const [coinTable, setCoinTable] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(2);
  const navigate = useNavigate();
  console.log(search);
  const fetchCoin = async () => {
    const { data } = await axios.get(CoinList(currency));
    setCoinTable(data);
    setLoding(true);
    console.log(coinTable);
    console.log(loading);
  };
  useEffect(() => {
    fetchCoin();
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ marginTop: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency price by Market Capital
        </Typography>
        <TextField
          label="Search a crypto currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        ></TextField>
        <TableContainer>
          {loading ? (
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "gold" }}>
                  {["Coin", "Price", "24h change", "Market Cap"].map((data) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat"
                      }}
                      key={data}
                    >
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        className={classes.row}
                        key={row.id}
                        onClick={() => {
                          navigate(`/coin/${row.id}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {symbol} {numberWithCommas(row.current_price)}
                        </TableCell>
                        <TableCell>
                          {profit && " +"}
                          <span
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500
                            }}
                          >
                            {row.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span style={{}}>
                            {symbol}{" "}
                            {numberWithCommas(convertAmt(row.market_cap))}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          ) : (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch().length / 10).toFixed(0)}
          variant="outlined"
          shape="rounded"
          color="primary"
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
          classes={{ ul: classes.ul }}
          onChange={(_, value) => {
            console.log(value);
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};
export default CoinTable;
