import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useDispatch} from "react-redux";
import allActions from "../../redux/actions";

export default function AutocompleteSearchNormal(props) {
    const {invitesList} = props;
    const dispatch = useDispatch();
    const setInvitersListFiltered = (inviter) =>
        dispatch(allActions.invitersActions.setInvitersListFiltered(inviter));
    const clearFilter = () =>
        dispatch(allActions.invitersActions.clearInvitersListFilter());

    return (
        <Autocomplete
            id="combo-box-demo"
            options={invitesList}
            getOptionLabel={(inviter) => inviter.fullName}
            style={{ width: 300 }}
            selectOnFocus={true}
            onChange={((event, value, reason, details) => {
                console.log("reason")
                console.log(reason)
                if(value && reason==="select-option"){
                    setInvitersListFiltered(value);
                }
                if(reason==="clear"){
                    clearFilter();
                }
            })}
            onClose = {((event, reason) => {
                console.log("on close called ")
                console.log(reason)
                if(reason==="clear") {
                    clearFilter();
                }
            })}

            renderInput={(params) => <TextField {...params} label="Search for inviter" variant="outlined" />}
        />
    );
}

