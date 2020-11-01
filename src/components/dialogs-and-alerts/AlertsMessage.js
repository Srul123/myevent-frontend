import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertsMessage(props) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ position: "relative", maxHeight: "25vh" }}
    >
      {props.messages.map((message, index) => (
        <Alert key={index} severity="error">
          {message}
        </Alert>
      ))}
    </div>
  );
}
