import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function AutocompleteSearchCheckboxesTags(props) {
    const {groups} = props;
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={groups}
            disableCloseOnSelect
            getOptionLabel={(option) => option.groupName}
            onChange={((event, value, reason, details) => {
                console.log("value");
                console.log(value);
                if (value && reason === "select-option") {
                    // setInvitersListFiltered(value);
                }
                if (reason === "clear") {
                    // clearFilter();
                }
            })}
            renderOption={(option, {selected}) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{marginRight: 8}}
                        checked={selected}
                    />
                    {option.groupName}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Groups" placeholder="Filter by group"/>
            )}
        />
    );
}

