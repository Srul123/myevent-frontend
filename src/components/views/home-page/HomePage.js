import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Carousel from "../../carousel/Carousel";
import { Link } from "react-router-dom";


import photo_event_management from "../../../assets/event_management.jpg";
import seating_plan from "../../../assets/seat_plaining.jpg";
import wedding_rsvp from "../../../assets/wedding_rsvp.jpg";



const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const tutorialSteps = [ // pass as props fror Carousel comp
    {
      label: 'Manage your event is so easy',
      imgPath:
      photo_event_management,
    },
    {
      label: 'Make your all Seating Plan in 15 minutes',
      imgPath: seating_plan,
    },
    {
      label: 'Create and mange your RSVP in easy way',
      imgPath:
      wedding_rsvp,
    }
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My-Event
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Build your event any time any where
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link
                      to="/signup"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Click to sign up
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <Link to="/signin" style={{ textDecoration: "none" }}>
                      Click to sign in
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
            <Carousel tutorialSteps={tutorialSteps}/>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}


