import { Container, makeStyles, Typography } from "@material-ui/core";
import Crosel from "./crosel";

const useStyles = makeStyles(() => ({
  banner: {
    background:
      "url(https://images.unsplash.com/photo-1636953056323-9c09fdd74fa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxUaEVUZjJyd2MwNHx8ZW58MHx8fHw%3D&w=1000&q=80)"
  },
  tagline: {
    display: "flex",
    height: "40%",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  contant: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around"
  }
}));
const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.contant}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              color: "#fff",
              fontWight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat"
            }}
          >
            Crypto MeMo
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat"
            }}
          >
            get all the info regarding your crypto currency.
          </Typography>
        </div>
        <Crosel />
      </Container>
    </div>
  );
};
export default Banner;
