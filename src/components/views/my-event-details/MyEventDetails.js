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
import FormControl from '@material-ui/core/FormControl';

import axios from "axios";
import {useSelector,useDispatch } from "react-redux";
import Moment from 'moment';

import Button from "@material-ui/core/Button";
import allActions from "../../../redux/actions";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SnackbarWithPosition from "../../alerts/SnackbarWithPosition";


import "./MyEventDetails.scss";


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
    formControl: {
        minWidth: 120,
    },
}));

export default function MyEventDetails() {
    const classes = useStyles();
    const user = useSelector((state) =>  state.userReducer.user);

    const dispatch = useDispatch();
    const updateUserDetails = (user) =>
        dispatch(allActions.userActions.updateUserDetails(user));

    const initEventName = user.details ? user.details.eventName : "";
    const [eventName, setEventName] = React.useState(initEventName);

    const initEventType = user.details ? user.details.eventType : "";
    const [eventType, setEventType] = React.useState(initEventType);

    const currently = new Date();
    const currentlyDate = new Date(currently.getFullYear() + "-" +
        (currently.getMonth() + 1) + "-" +
        currently.getDate());
    const initDate = user.details ? user.details.eventDate : currentlyDate;
    const [eventDate, setEventDate] = React.useState(new Date(initDate));
    const initTime = Moment(initDate).format('HH:mm');
    const [selectedTime, setSelectedTime] = React.useState(initTime);

    const initEventLocation = user.details ? user.details.location.locationName : "";
    const [locationName, setLocationName] = React.useState(initEventLocation);

    const initLocationLink = user.details ? user.details.location.locationLink : "";
    const [locationLink, setLocationLink] = React.useState(initLocationLink);

    const [alertPopup, setAlertPopup] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAlertPopup({open: true, ...alertPopup});
        const date = Moment(eventDate).format("YYYY-MM-DD");
        let dateWithTime = Moment(`${date} ${selectedTime}`);
        dateWithTime = new Date(dateWithTime);
        const userDetails = {
            eventName,
            eventType,
            eventDate: dateWithTime,
            location: {
                locationName,
                locationLink
            }
        };
        user.details = userDetails;
        let response;
        try {
            response = await axios.put(`http://localhost:5000/users/${user.id}`, user);
            updateUserDetails(response.data);
            riseAlert();

        } catch (e) {
            console.log("Error from MyEventDetails " + response);
            console.log(e);
        }
    };

    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const riseAlert = () => {
        setAlertPopup({open: true,...{vertical: 'top', horizontal: 'center'}});
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
                                    className={"eventName"}
                                    id="eventName"
                                    label="My event name"
                                    variant="outlined"
                                    value={eventName}
                                    onChange={(event => setEventName(event.target.value))}
                                />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Event type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={eventType}
                                        onChange={(event)=> setEventType(event.target.value)}
                                        label="Event type"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={"Wedding"}>Wedding</MenuItem>
                                        <MenuItem value={"Bar Mitzvah"}>Bar Mitzvah</MenuItem>
                                        <MenuItem value={"Brit milah"}>Brit milah</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Event date"
                                        value={eventDate}
                                        onChange={(eventDate) => setEventDate(eventDate)}
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
                            <div>
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
                            <SnackbarWithPosition  alertPopup={alertPopup}  closeAlert={closeAlert} message="Saved" severity="success"/>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
