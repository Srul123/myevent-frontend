import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {useSelector, useDispatch} from "react-redux";
import allActions from "../../../redux/actions";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./AddInviterStyle.scss";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import SnackbarWithPosition from "../../alerts/SnackbarWithPosition";
import {validateInviter} from "../../../services/validationsFunctions";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function AddInviterModal(props) {
    const {openInviterDialog, setOpenInviterDialog} = props;
    const [inviterName, setInviterName] = React.useState({
        value: "",
        error: false,
        errorNameMsg: "Please provide a name inviter",
    });
    const [quantity, setQuantity] = React.useState({
        value: 1,
        error: false,
        errorQuantityMsg: "Please provide valid quantity"
    });
    const [phoneNumber, setPhoneNumber] = React.useState({
        value: "",
        error: false,
        errorPhoneNumberMsg: "Please provide valid phone number"
    });
    const [email, setEmail] = React.useState({
        value: "",
        error: false,
        errorEmailMsg: "Please provide valid email address",
    });

    const [needRide, setNeedRide] = React.useState(false);
    const [address, setAddress] = React.useState("");

    const user = useSelector(state => state.userReducer.user);
    const owners = user.details.eventOwners;
    const userID = user.id;
    const groups = useSelector(state => state.groupReducer.groupList);
    const [owner, setOwner] = React.useState(0);
    const [group, setGroup] = React.useState(0);
    const dispatch = useDispatch();
    const addNewInviter = (inviter) =>dispatch(allActions.invitersActions.addInviter(inviter));
    // setOpenInviterDialog(true);
    const [alertPopup, setAlertPopup] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const riseAlert = () => {
        setAlertPopup({open: true, ...{vertical: 'top', horizontal: 'center'}});
    };

    const handleClose = () => {
        setOpenInviterDialog(false);
    };

    const refreshDataValuesToDefault = ()  => {
        setInviterName({value: "", error: false, errorNameMsg: "Please provide a name inviter"});
        setQuantity({
            value: 1,
            error: false,
            errorQuantityMsg: "Please provide valid quantity"
        });
        setPhoneNumber({
            value: "",
            error: false,
            errorPhoneNumberMsg: "Please provide valid phone number"
        });
        setEmail({
            value: "",
            error: false,
            errorEmailMsg: "Please provide valid email address",
        });
        setNeedRide(false);
        setAddress("");
        setOwner(0);
        setGroup(0);
    };

    const handleSubmit = () => {
        if (!validateInviter({
            inviterName,
            setInviterName,
            quantity,
            setQuantity,
            phoneNumber,
            setPhoneNumber,
            email,
            setEmail})) {
            let chosenOwner = owners.find(otherOwner=>{
                return otherOwner.id===Number(owner);
            });
            const chosenGroup = groups.find(otherGroup=>{
                return otherGroup.id===Number(group);
            });
            const newInviter = {
                user_id: userID,
                fullName: inviterName.value.trim(),
                phoneNumber: phoneNumber.value.trim(),
                emailAddress: email.value.trim(),
                groupId: chosenGroup.id,
                groupName: chosenGroup.groupName,
                ownerName: chosenOwner.name,
                ownerId: chosenOwner.id,
                numberOfGuests: quantity.value,
                needRide,
                address,
                dateCreated: Date.now(),
                alreadyApprove: false
            }
            addNewInviter(newInviter);
            setOpenInviterDialog(false);
            refreshDataValuesToDefault();
            riseAlert();
        } else {
            console.log("Need chages )-: !!!!!!!!!!!!!!!!!!!!!!")
        }

    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openInviterDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <PersonAddIcon/> <span style={{position:"relative", bottom:"0.5vh"}}>Add Inviter</span>
                </DialogTitle>
                <DialogContent dividers>
                    <form className={"AddInviterForm"} noValidate autoComplete="off">
                        <FormControl fullWidth>
                            <div className={"name-and-quantity"}>
                                <TextField type="text"
                                           label="Inviter Name"
                                           value={inviterName.value}
                                           onChange={event => setInviterName({
                                               ...inviterName,
                                               value: event.target.value
                                           })}
                                           error={inviterName.error}
                                           helperText={inviterName.error ? inviterName.errorNameMsg : ""}
                                           required/>
                                <TextField type={"number"}
                                           label="Accompanies Quantity"
                                           helperText={quantity.error ? quantity.errorQuantityMsg : ""}
                                           error={quantity.error}
                                           value={quantity.value}
                                           onChange={event => setQuantity({
                                               ...quantity,
                                               value: Number(event.target.value)
                                           })}
                                />
                            </div>
                        </FormControl>
                        <FormControl fullWidth>
                            <div className={"phone-and-email"}>
                                <TextField type={"tel"}
                                           label="Phone Number"
                                           value={phoneNumber.value}
                                           onChange={event => setPhoneNumber({
                                               ...phoneNumber,
                                               value: event.target.value
                                           })}
                                           error={phoneNumber.error}
                                           helperText={phoneNumber.error ? phoneNumber.errorPhoneNumberMsg : ""}
                                />
                                <TextField type={"email"}
                                           label="Email"
                                           value={email.value}
                                           error={email.error}
                                           helperText={email.error ? email.errorEmailMsg : ""}
                                           onChange={(event) => setEmail({...email, value: event.target.value})}
                                />
                            </div>
                        </FormControl>
                        <FormControl fullWidth>
                            <div className={"group-owner"}>
                                <FormControl>
                                    <InputLabel htmlFor="eventOwner">Owner</InputLabel>
                                    <NativeSelect
                                        value={owner}
                                        onChange={(event) => {
                                            setOwner(event.target.value)
                                        }}
                                        name="eventOwner"
                                    >
                                        {owners.map((owner) => <option key={owner.id}
                                                                       value={owner.id}>{owner.name}</option>)}
                                    </NativeSelect>
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="group">Group</InputLabel>
                                    <NativeSelect
                                        value={group}
                                        onChange={(event) => {
                                            setGroup(event.target.value);
                                        }}
                                        name="group"
                                    >
                                        {groups.map((group) => <option key={group.id}
                                                                       value={group.id}>{group.groupName}</option>)}
                                    </NativeSelect>
                                </FormControl>
                            </div>
                        </FormControl>
                        <FormControl fullWidth>
                            <div className={"location-ride"}>
                                <TextField
                                    label="Address"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}/>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={needRide}
                                                onChange={(event, checked) => setNeedRide(checked)}
                                                name="needRide"
                                                color="primary"
                                            />
                                        }
                                        label={"Need Ride"}
                                        labelPlacement={"top"}
                                    />
                                </div>
                            </div>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary">
                        Add new inviter
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackbarWithPosition alertPopup={alertPopup} closeAlert={closeAlert} message="Saved"
                                  severity="success"/>
        </div>
    )
        ;
}


