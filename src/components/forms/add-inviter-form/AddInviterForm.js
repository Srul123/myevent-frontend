import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../../redux/actions";
import {validateInviter} from "../../../services/validationsFunctions";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import SnackbarWithPosition from "../../dialogs-and-alerts/SnackbarWithPosition";
import Button from "@material-ui/core/Button";

import "./AddInviterForm.scss";

function AddInviterForm(props) {
    const {setOpenInviterDialog} = props;
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
    const addNewInviter = (inviter) => dispatch(allActions.invitersActions.addInviter(inviter));
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
    const refreshDataValuesToDefault = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("event data")
        console.log(event);
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
                        Add new inviter
                    </Button>
            </FormControl>
        </form>
            <SnackbarWithPosition alertPopup={alertPopup} closeAlert={closeAlert} message="Saved"
                                  severity="success"/>
        </React.Fragment>

    );
}

export default AddInviterForm;