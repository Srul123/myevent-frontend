import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import AlertsMessage from "../../dialogs-and-alerts/AlertsMessage";
import AlertDialog from "../../dialogs-and-alerts/AlertDialog";
import axios from "axios";
import { validateInputsSignUp } from "../../../services/validationsFunctions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const [riseAlert, setRiseAlert] = useState(false);
  const [messages, setMssages] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorToAlerts = validateInputsSignUp(
      firstName,
      lastName,
      email,
      password
    );
    if (errorToAlerts.length > 0) {
      setMssages(errorToAlerts);
      setRiseAlert(true);
      return;
    } else {
      setRiseAlert(false);
      handleClose();
      const user = {
        firstName,
        lastName,
        email,
        password,
        details: {
          eventOwners: [
            {
              name: "None",
              id: 0
            },
            {
              ame: `${firstName} ${lastName}`,
              id: 1
            }
          ],
          eventName: "",
          eventType: "",
          eventDate: Date(),
          location: {
            locationName: "",
            locationLink: ""
          }
        }
      };

      try {
        const response = await axios.post(`http://localhost:5000/users/`, user);
        // eslint-disable-next-line
        const data = response.data;
        setOpen(true);
      } catch (error) {
        console.log("error");
        console.log(error);
      }
    }
  };


  const handleClose = (value) => {
    setOpen(false);
    setTimeout(() => {
      history.push("/signin");
    }, 3000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {riseAlert && (
        <div style={{ overflow: "auto" }}>
          <AlertsMessage messages={messages} />
        </div>
      )}
      <AlertDialog
        open={open}
        onClose={handleClose}
        title={"Your registration is complete"}
        message={"Please login to your account"}
      />
    </Container>
  );
}

export default SignUp;

