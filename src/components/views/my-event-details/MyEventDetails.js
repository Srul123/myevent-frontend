import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import {useSelector,useDispatch } from "react-redux";


import "./MyEventDetails.scss";
import Button from "@material-ui/core/Button";
import allActions from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function MyEventDetails() {
    const classes = useStyles();
    debugger;
    const user = useSelector((state) => {
        console.log(state)
        return state.userReducer.user;
    });

    const dispatch = useDispatch();
    const updateUserDetails = (user) =>
        dispatch(allActions.userActions.updateUserDetails(user));

    const initEventName = user.details ? user.details.eventName : "";
    const [eventName, setEventName] = React.useState(initEventName);

    const currently = new Date();
    const currentlyDate = new Date(currently.getFullYear() + "-" +
        (currently.getMonth() + 1) + "-" +
        currently.getDate());
    const initDate = user.details ? user.details.eventDate : currentlyDate;
    const [eventDate, setEventDate] = React.useState(new Date(initDate));

    const initTime = user.details ? user.details.eventTime : "12:00";
    const [selectedTime, setSelectedTime] = React.useState(initTime);

    const initEventLocation = user.details ? user.details.location.locationName : "";
    const [locationName, setLocationName] = React.useState(initEventLocation);

    const initLocationLink = user.details ? user.details.location.locationLink : "";
    const [locationLink, setLocationLink] = React.useState(initLocationLink);

    const handleSubmit = async (event) => {
        event.preventDefault();
        debugger;
        const userDetails = {
            eventName,
            eventDate,
            eventTime: selectedTime,
            location: {
                locationName,
                locationLink
            }
        };
        user.details = userDetails;
        let response;
        try {
            response = await axios.put(`http://localhost:5000/users/${user.id}`, user);
            console.log(response);
            updateUserDetails(response.data);
        } catch (e) {
            console.log("Error from MyEventDetails " + response);
            console.log(e);
        }
    };

    return (
        <div
            className={classes.root}
            style={{ marginTop: "80px"}}
        >
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <form className={classes.form} noValidate autoComplete="off">
                            <div className="first-row">
                                <TextField
                                    id="outlined-basic"
                                    label="My event name"
                                    variant="outlined"
                                    value={eventName}
                                    onChange={(event => setEventName(event.target.value))}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Event date"
                                        value={eventDate}
                                        onChange={() => setEventDate(eventDate)}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                        style={{margin: "0"}}
                                    />
                                </MuiPickersUtilsProvider>
                                <TextField
                                    id="time"
                                    label="Event time start"
                                    type="time"
                                    defaultValue={selectedTime}
                                    className={classes.textField}
                                    onChange={(event) => setSelectedTime(event.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </div>
                            <div className="second-row">
                                <TextField label="Location of the event" variant="filled" style={{marginRight: "5px"}}
                                           value={locationName}
                                           onChange={(event) => setLocationName(event.target.value)}/>
                                <TextField label="Link to Waze/Google" variant="filled" style={{marginLeft: "5px"}}
                                           value={locationLink} onChange={(event => setLocationLink(event.target.value))}/>
                            </div>
                            <div>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
