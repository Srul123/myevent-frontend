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
                            <div>
                                <Typography variant="h3">{user.details.eventName}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6">Event
                                    date: {Moment(eventDate).format('dd mm YYYY')}</Typography>
                                <Typography variant="h6">Event start: <Countdown date={eventDate.getTime()}/>
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