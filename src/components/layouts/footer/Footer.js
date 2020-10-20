import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const footerStyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: "1vh",
    backgroundColor: "rgb(63,81,181)",
    color: "white"
}

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer} style={footerStyle}>
            <Typography variant="body2"  align="center">
                {'Copyright © '}
                <Link color="inherit" to="/" style={{color:"white"}}>
                    My-Event
        </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}

