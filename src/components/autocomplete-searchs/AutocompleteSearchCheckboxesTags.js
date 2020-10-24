import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../redux/actions";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AutocompleteSearchCheckboxesTags(props) {
  const { groups } = props;
  const dispatch = useDispatch();
  const invitersList = useSelector(
    (state) => state.invitersReducer.invitersList
  );
  const filterBySelectedGroups = (selectedGroupsArr) => {
    const groupsStringsArr = selectedGroupsArr.map((groupObj) => {
      return groupObj.groupName;
    });
    const filteredInviters = invitersList.filter((el) => {
      return groupsStringsArr.indexOf(el.groupName) !== -1;
    });
    dispatch(
      allActions.invitersActions.setInvitersListFiltered(filteredInviters)
    );
  };
  const clearFilter = () =>
    dispatch(allActions.invitersActions.clearInvitersListFilter());
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={groups}
      disableCloseOnSelect
      getOptionLabel={(option) => option.groupName}
      onChange={(event, value, reason, details) => {
        if (value && reason === "select-option") {
          filterBySelectedGroups(value);
        }
        if (reason === "clear") {
          clearFilter();
        }
      }}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.groupName}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Groups"
          placeholder="Filter by group"
        />
      )}
    />
  );
}
