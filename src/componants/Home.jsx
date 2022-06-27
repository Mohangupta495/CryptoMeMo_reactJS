import { makeStyles } from "@material-ui/core";
import Banner from "./Banner";
import CoinTable from "./CoinTable";
import { CryptoState } from "./CryptoContext";

const useStyle = makeStyles(() => ({
  title: {}
}));

const Home = () => {
  const { currency } = CryptoState();
  const classes = useStyle();
  return (
    <div className={classes.title}>
      <Banner />
      <CoinTable />
    </div>
  );
};
export default Home;
