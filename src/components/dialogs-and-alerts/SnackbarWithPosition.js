import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from "@material-ui/lab/Alert";

export default function SnackbarWithPosition(props) {
    const {alertPopup, closeAlert, message, severity} = props;

    const {vertical, horizontal, open} = alertPopup;

    return (
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                open={open}
                onClose={closeAlert}
                key={vertical + horizontal}
                autoHideDuration={3500}
            >
                <Alert onClose={closeAlert} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
    );
}