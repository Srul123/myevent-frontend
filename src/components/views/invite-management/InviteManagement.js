import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SpeedDials from "../../speed-dials/SpeedDials";
import CheckboxSelectionGrid from "../../lists-and-tables/CheckboxSelectionGrid";
import AutocompleteSearchNormal from "../../autocomplete-searchs/AutocompleteSearchNormal";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useSelector} from "react-redux";
import EnhancedTable from "../../lists-and-tables/EnhancedTable";
import AutocompleteSearchCheckboxesTags from "../../autocomplete-searchs/AutocompleteSearchCheckboxesTags";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));


function prepareTableHeadDataForComp() {
    const headCells = [
        {id: 'fullName', numeric: false, disablePadding: true, label: 'Name'},
        {id: 'groupName', numeric: false, disablePadding: false, label: 'Group'},
        {id: 'alreadyApprove', numeric: false, disablePadding: false, label: 'Approved arrival'},
        {id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone'},
        {id: 'emailAddress', numeric: false, disablePadding: false, label: 'email'},
        {id: 'numberOfGuests', numeric: true, disablePadding: false, label: 'Quantity'},
        {id: 'needRide', numeric: false, disablePadding: false, label: 'Need ride'},
    ];
    return headCells;
}

export default function InviteManagement() {

    const classes = useStyles();
    const [groupToSearch, setGroupToSearch] = React.useState('');
    const [phoneToSearch, setPhoneToSearch] = React.useState('');
    const invitersListFilter = useSelector(state => state.invitersReducer.invitersListFiltered);
    const invitersList = useSelector(state => state.invitersReducer.invitersList);
    console.log("invitersList");
    console.log(invitersList);
    const tableHeadData = prepareTableHeadDataForComp();

    return (
        <React.Fragment>
            <SpeedDials/>
            <div className={classes.root} style={{marginTop: "80px"}}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12} className="top-title-page">
                                <AutocompleteSearchNormal invitesList={invitersList}
                                                          label={"Search for inviter by name or phone number"}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                {/*<FormControl className={classes.formControl}>*/}
                                <div className="wrapper-filter" style={{marginTop:"2vh"}}>
                                    <AutocompleteSearchCheckboxesTags />

                                </div>
                                {/*</FormControl>*/}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <EnhancedTable title={"Inviters List"} headCell={tableHeadData} rows={invitersListFilter}/>
                    </Grid>

                </Grid>

            </div>


        </React.Fragment>
    );
}


