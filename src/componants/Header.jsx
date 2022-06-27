import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  makeStyles,
  createTheme,
  ThemeProvider
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "./CryptoContext";

const useStyle = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff"
    },
    type: "dark"
  }
});

const Header = () => {
  const { currency, symbol, setCurrency } = CryptoState();
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                className={classes.title}
                onClick={() => {
                  navigate("/");
                }}
              >
                Crypto Memo
              </Typography>
              <Select
                variant="outlined"
                style={{ width: 100, height: 40, marginLeft: 15 }}
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};
export default Header;
