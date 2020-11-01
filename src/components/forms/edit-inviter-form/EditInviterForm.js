import React, {Component} from 'react';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SnackbarWithPosition from "../../dialogs-and-alerts/SnackbarWithPosition";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../../redux/actions";
import {validateInviter} from "../../../services/validationsFunctions";
import Button from "@material-ui/core/Button";

function EditInviterForm(props) {
    const {openInviterDialog, setOpenInviterDialog} = props;
    const dispatch = useDispatch();
    const curInviterToEdit = useSelector(state => state.invitersReducer.curInviter);

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
        value: curInviterToEdit ? curInviterToEdit.emailAddress : "",
        error: false,
        errorEmailMsg: "Please provide valid email address",
    });
    const [needRide, setNeedRide] = React.useState(false);
    const [address, setAddress] = React.useState("");
    const user = useSelector(state => state.userReducer.user);
    const [owner, setOwner] = React.useState(0);
    const [group, setGroup] = React.useState(0);
    React.useEffect(() => {
        if (curInviterToEdit !== null) {
            setInviterName({...inviterName, value: curInviterToEdit.fullName});
            setQuantity({...quantity, value: curInviterToEdit.numberOfGuests});
            setPhoneNumber({...phoneNumber, value: curInviterToEdit.phoneNumber});
            setEmail({...email, value:curInviterToEdit.emailAddress});
            setNeedRide(curInviterToEdit.needRide);
            setAddress(curInviterToEdit.address);
            setGroup(curInviterToEdit.groupId);
            setOwner(curInviterToEdit.ownerId);
        }
    },[curInviterToEdit])

    const groups = useSelector(state => state.groupReducer.groupList);
    const owners = user.details.eventOwners;
    const editCurInviter = (inviter) => dispatch(allActions.invitersActions.editInviter(inviter));
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
        refreshDataValuesToDefault();
        setOpenInviterDialog(false);

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateInviter({
            inviterName,
            setInviterName,
            quantity,
            setQuantity,
            phoneNumber,
            setPhoneNumber,
            email,
            setEmail
        })) {
            let chosenOwner = owners.find(otherOwner => {
                return otherOwner.id === Number(owner);
            });
            const chosenGroup = groups.find(otherGroup => {
                return otherGroup.id === Number(group);
            });
            const editInviter = {
                ...curInviterToEdit,
                fullName: inviterName.value.trim(),
                phoneNumber: phoneNumber.value.trim(),
                emailAddress: email.value.trim(),
                groupId: chosenGroup.id,
                groupName: chosenGroup.groupName.trim(),
                ownerName: chosenOwner.name.trim(),
                ownerId: chosenOwner.id,
                numberOfGuests: quantity.value,
                needRide: needRide,
                alreadyApprove: false
            }
            editCurInviter(editInviter);
            riseAlert();
            handleClose();
        } else {
            console.log("Need chages )-: !!!!!!!!!!!!!!!!!!!!!!")
        }

    };

    const refreshDataValuesToDefault = ()  => {
        setInviterName({
            ...inviterName,
            error: false
        });
        setQuantity({
            ...quantity,
            error: false,
        });
        setPhoneNumber({
            ...phoneNumber,
            error: false,
        });
        setEmail({
            ...email,
            error: false,
        });
    };

    if (curInviterToEdit === null) {
        return null;
    }
        return (
            <React.Fragment>
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
                    <FormControl>
                        <Button type={"submit"} variant="outlined" size="large" color="primary" onClick={handleSubmit}>
                           Edit inviter
                        </Button>
                    </FormControl>
                </form>
                <SnackbarWithPosition alertPopup={alertPopup} closeAlert={closeAlert} message="Saved"
                                      severity="success"/>
            </React.Fragment>
        );
}

export default EditInviterForm;