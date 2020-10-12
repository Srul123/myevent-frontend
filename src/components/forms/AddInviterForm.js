import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }

}));

export default function AddInviterForm() {
    const classes = useStyles();

    return (
        <form className={""} noValidate autoComplete="off">
            <FormControl className={classes.formControl}  style={{width: "100%"}}>
                <div style={{display:"flex"}}>
                    <TextField id="standard-basic" label="Inviter Name" />
                    <TextField id="standard-basic" label="accompanies quantity" />
                </div>
                <div style={{display:"flex"}}>
                    <TextField id="standard-basic" label="phoneNumber" />
                    <TextField id="standard-basic" label="emailAddress" />
                </div>
                <div style={{display:"flex"}}>
                    <TextField id="standard-basic" label="groupName" />
                    <TextField id="standard-basic" label="ownerName" />
                    <TextField id="standard-basic" label="needRide" />
                </div>
            </FormControl>

        </form>
    );
}

