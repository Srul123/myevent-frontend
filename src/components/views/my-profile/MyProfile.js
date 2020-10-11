import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Countdown from 'react-countdown';
import {useSelector} from 'react-redux';
import Moment from 'moment';

import "./MyProfile.scss";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function MyProfile() {
    const user = useSelector(state => state.userReducer.user);
    let eventDate = new Date(user.details.eventDate);
    const classes = useStyles();
    return (
        <div className={classes.root} style={{marginTop: "80px"}}>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className="top-title-page">
                            <div style={{borderRight: "1px solid black"}}>
                                <Typography variant="h4">{user.details.eventName}</Typography>
                                <Typography variant="h6">location: {user.details.location.locationName}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6">Event
                                    date: {Moment(eventDate).format('DD.MM.YYYY')}</Typography>
                                <Typography variant="h6">Event
                                    Time: {Moment(eventDate).format('hh:mm')}</Typography>
                                <Typography variant="h6">{"Event start in: "}
                                    <Countdown date={eventDate.getTime()}/>
                                    {" days"}
                                </Typography>

                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>Total inviters: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h6"}>Approved arrival: </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                    <Typography variant={"h6"}>Expenses: </Typography>
                    <Typography variant={"h6"}>Incomes: </Typography>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}